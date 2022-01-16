#include <WiFi.h>
#include <FirebaseESP32.h>
#include <HardwareSerial.h>
#include <TinyGPSPlus.h>
#include <math.h>
#include <SPI.h>
#include <SD.h>


#define FIREBASE_HOST "https://trinket-ideahacks-default-rtdb.firebaseio.com/"
#define FIREBASE_AUTH "I44ivk8FBivPIvMjlRtTWYH8J9MJ06ye8Q72jzAG"
#define FIREBASE_ACTIVITY_PATH "/activities/"
#define FIREBASE_OBJECTIVES_PATH "/objectives/"
#define WIFI_SSID "CalebAndroid"
#define WIFI_PASSWORD "wxai8878"
#define OBJECTIVES_FILE "objectives.txt"
#define NUM_OBJECTIVES 3
#define NUM_OBJECTIVES_FIELDS 10
#define SD_MOSI 0
#define SD_MISO 0
#define SD_CLK 0
#define SD_CS 0
#define SD_BASEFILE  "activity_names.txt"


FirebaseData firebaseData;
HardwareSerial gpsSerial(2);
TinyGPSPlus gps;

struct Objective{
  String m_name;
  String m_rule; //time, day
  String m_day; //select one or more from MTWHFSU
  int m_hourLow; 
  int m_hourHigh;
  bool m_complete; 
  String m_field; //steps, altitude, temperature, duration, distance
  String m_goalCmp; //ge, le
  float m_goalVal;
  float m_currVal;
};

void displayInfo();
void setup_WIFI();
void setup_firebase();
void turnoff_firebase();
void do_activity();
void sync();
double calc_distance(double lat, double lng, double prev_lat, double prev_lng);
bool read_objectives(String filename, Objective *objectives);
void write_objectives(String filename, Objective *objectives);

void setup() {
  // put your setup code here, to run once:   
  Serial.begin(9600);
  gpsSerial.begin(9600);
  if (!SD.begin(SD_CS))
    Serial.println("SD initialization failed!");
}

void loop() {
  // put your main code here, to run repeatedly:
//
//  while (gpsSerial.available() > 0)
//    if (gps.encode(gpsSerial.read()))
//      displayInfo();


  //TODO show main menu
  //TODO check for button presses

  {
    //TODO if sync button gets pushed
    if (WiFi.status() != WL_CONNECTED){
      setup_WIFI();
      setup_firebase();
    }

    sync();
  }

  {
    //TODO if start button gets pushed
    //TODO play a little jingle
    do_activity();
  }
}

void displayInfo()
{
  Serial.print(F("Location: ")); 
  if (gps.location.isValid())
  {
    Serial.print(gps.location.lat(), 6);
    Serial.print(F(","));
    Serial.print(gps.location.lng(), 6);
  }
  else
  {
    Serial.print(F("INVALID"));
  }

  Serial.print(F("  Date/Time: "));
  if (gps.date.isValid())
  {
    Serial.print(gps.date.month());
    Serial.print(F("/"));
    Serial.print(gps.date.day());
    Serial.print(F("/"));
    Serial.print(gps.date.year());
  }
  else
  {
    Serial.print(F("INVALID"));
  }

  Serial.print(F(" "));
  if (gps.time.isValid())
  {
    if (gps.time.hour() < 10) Serial.print(F("0"));
    Serial.print(gps.time.hour());
    Serial.print(F(":"));
    if (gps.time.minute() < 10) Serial.print(F("0"));
    Serial.print(gps.time.minute());
    Serial.print(F(":"));
    if (gps.time.second() < 10) Serial.print(F("0"));
    Serial.print(gps.time.second());
    Serial.print(F("."));
    if (gps.time.centisecond() < 10) Serial.print(F("0"));
    Serial.print(gps.time.centisecond());
  }
  else
  {
    Serial.print(F("INVALID"));
  }

  Serial.println();
}

void setup_WIFI(){
  WiFi.begin(WIFI_SSID, WIFI_PASSWORD);
 
  while (WiFi.status() != WL_CONNECTED) {
    delay(500);
    Serial.println("Connecting to WiFi..");
  }
 
  Serial.println("Connected to the WiFi network"); 
}
  
void setup_firebase(){
  Firebase.begin(FIREBASE_HOST, FIREBASE_AUTH);
  Firebase.reconnectWiFi(true);

  //Set database read timeout to 1 minute (max 15 minutes)
  Firebase.setReadTimeout(firebaseData, 1000 * 60);
  //tiny, small, medium, large and unlimited.
  //Size and its write timeout e.g. tiny (1s), small (10s), medium (30s) and large (60s).
  Firebase.setwriteSizeLimit(firebaseData, "tiny");

  Serial.println("Connected to Firebase database");
}

void turnoff_firebase(){
  Firebase.end(firebaseData);
  Serial.println("Stopped Firebase");
}

void do_activity(){
  
  Objective objectives [NUM_OBJECTIVES];
  bool hasObjectives = read_objectives(OBJECTIVES_FILE, objectives);

  File activityFile, baseFile;

  //search for location
  //TODO display searching for location
  bool foundLocation = false;
  while (!foundLocation){
    delay(500);
    Serial.println("Searching for location");
    while (gpsSerial.available() > 0){
      if (gps.encode(gpsSerial.read()) && gps.location.isValid()){
        foundLocation = true;
        //TODO play a little jingle
        break;
      }
    }
  }

  //set initial reading values
  double distance = 0; //miles
  int steps = 0;
  int duration = 0; //seconds
  double start_alt = gps.altitude.miles(); //miles
  double prev_lat = gps.location.lat();
  double prev_lng = gps.location.lng();
  float alt = gps.altitude.miles(); //miles
  float currSpeed = gps.speed.mph(); //mph
  unsigned long prev_reading = millis();
  int startYear = gps.date.year();
  int startMonth = gps.date.month();
  int startDay = gps.date.day();
  int startHour = gps.time.hour();
  int startMinute = gps.time.minute();
  int startSecond = gps.time.second();

  //check for rule fits
  bool fitRules[NUM_OBJECTIVES];
  for (int i = 0; i < NUM_OBJECTIVES; i++) {
    fitRules[i] = false;
    if (objectives[i].m_rule == "day"){
        int t [] = { 0, 3, 2, 5, 0, 3, 5, 1, 4, 6, 2, 4 };
        int startYearTemp = startYear - (startMonth < 3);
        //0 is Sunday
        int day = (startYearTemp + startYearTemp/4 - startYearTemp/100 + startYearTemp/400 + t[startMonth-1] + startDay) % 7;
        char dayChar;
        switch (day) {
          case 0: dayChar = 'U'; break;
          case 1: dayChar = 'M'; break;
          case 2: dayChar = 'T'; break;
          case 3: dayChar = 'W'; break;
          case 4: dayChar = 'H'; break;
          case 5: dayChar = 'F'; break;
          default: dayChar = 'S'; break;
        }
        
        for (int j = 0; j < objectives[i].m_day.length(); j++){
          if (objectives[i].m_day[j] == dayChar){
            fitRules[i] = true;
            break;
          }
        }          
    }
    else if (objectives[i].m_rule == "time"){
      if (startHour >= objectives[i].m_hourLow && startHour < objectives[i].m_hourHigh)
        fitRules[i] = true;
    }
    else
      fitRules[i] = true;
  }
  
  String activityName = String(gps.date.year());
  activityName += "-" + String(gps.date.month());
  activityName += "-" + String(gps.date.day());
  activityName += "-" + String(gps.time.hour());
  activityName += "-" + String(gps.time.minute());
  activityName += "-" + String(gps.time.second());
  activityName += ".csv";

  baseFile = SD.open(SD_BASEFILE, FILE_WRITE);
  baseFile.print(activityName + ",");
  baseFile.close();

  activityFile = SD.open(activityName, FILE_WRITE);
  
  while (true){
    //main activity loop  

    
    //TODO check for button press to update screen or finish activity
    bool changeScreen = false;

    {
      //TODO check if button pressed to finish activity
      //TODO play a little jingle
      if (hasObjectives){      
        for (int i = 0; i < NUM_OBJECTIVES; i++){
          if (objectives[i].m_complete || !fitRules[i])
            continue;

          if (objectives[i].m_field == "steps")
              objectives[i].m_currVal = float(steps) + objectives[i].m_currVal;
          else if (objectives[i].m_field == "altitude"){
            
          }
          else if (objectives[i].m_field == "temperature"){
            
          }
          else if (objectives[i].m_field == "duration")
            objectives[i].m_currVal = float(duration) + objectives[i].m_currVal;
          else if (objectives[i].m_field == "distance")
            objectives[i].m_currVal = distance + objectives[i].m_currVal;
        }
      }
      write_objectives(OBJECTIVES_FILE, objectives);
      activityFile.close();
      return;
    }

    //check for step update
    bool stepped = false;
    //TODO read mpu6050
    if (stepped)
      steps++;
    
    bool measurement = false; 
    while (gpsSerial.available() > 0){
      if (gps.encode(gpsSerial.read())){
        unsigned long curr = millis();
  
        if (curr - prev_reading >= 1000){ //read every secondish
          //read and log activity data
          measurement = true;
          double lat = gps.location.lat();
          double lng = gps.location.lng();
          double alt_new = gps.altitude.miles();
          
          double distanceMoved = calc_distance(lat, lng, prev_lat, prev_lng);
          distanceMoved = sqrt(pow(distanceMoved,2) + pow(alt_new - alt,2));
          alt = alt_new;
          distance += distanceMoved;
          currSpeed = gps.speed.mph();       

          int totalSeconds = 0;
          if (startDay != gps.date.day()) //assume if the days are not equal we crossed midnight
            totalSeconds = 60*60*24;

          totalSeconds += gps.time.second();
          totalSeconds += gps.time.minute() * 60;
          totalSeconds += gps.time.hour() * 60 * 60;
          totalSeconds -= startSecond;
          totalSeconds -= startMinute * 60;
          totalSeconds -= startHour * 60 * 60;

          duration = totalSeconds;
          
          String nowString = String(gps.date.year());
          nowString += "-" + String(gps.date.month());
          nowString += "-" + String(gps.date.day());
          nowString += "-" + String(gps.time.hour());
          nowString += "-" + String(gps.time.minute());
          nowString += "-" + String(gps.time.second());

          activityFile.print(nowString + ",");
          activityFile.print(String(duration) + ",");
          activityFile.print(String(lat) + ",");
          activityFile.print(String(lng) + ",");
          activityFile.print(String(distance) + ",");
          activityFile.print(String(alt) + ",");
          activityFile.print(String(currSpeed) + ",");
          activityFile.print(String(steps));
          //TODO add temp, humidity
          
          prev_lat = lat;
          prev_lng = lng;
          prev_reading = curr;
        }       
      }
    }

    //check if hit objective
    bool hitObjective = false;
    int objectiveNum = 0;
    if(hasObjectives && (stepped || measurement)){
      for (int i = 0; i < NUM_OBJECTIVES; i++){
        if (objectives[i].m_complete || !fitRules[i])
          continue;
          
        if (objectives[i].m_field == "steps"){
          if (float(steps) + objectives[i].m_currVal >= objectives[i].m_goalVal && objectives[i].m_goalCmp){
            hitObjective = true;
            objectiveNum = i;
            objectives[i].m_complete = true;
            objectives[i].m_currVal = objectives[i].m_goalVal;
          }
        }
        else if (objectives[i].m_field == "altitude"){
          if (alt >= objectives[i].m_goalVal && objectives[i].m_goalCmp == "ge" || alt <= objectives[i].m_goalVal && objectives[i].m_goalCmp == "le"){
            hitObjective = true;
            objectiveNum = i;
            objectives[i].m_complete = true;
            objectives[i].m_currVal = objectives[i].m_goalVal;
          }
        }
        else if (objectives[i].m_field == "temperature"){
          
        }
        else if (objectives[i].m_field == "duration"){
          if (float(duration) + objectives[i].m_currVal >= objectives[i].m_goalVal){
            hitObjective = true;
            objectiveNum = i;
            objectives[i].m_complete = true;
            objectives[i].m_currVal = objectives[i].m_goalVal;
          }
        }
        else if (objectives[i].m_field == "distance"){
          if (distance + objectives[i].m_currVal >= objectives[i].m_goalVal){
            hitObjective = true;
            objectiveNum = i;
            objectives[i].m_complete = true;
            objectives[i].m_currVal = objectives[i].m_goalVal;
          }            
        }          
      }
    }
    
    if (hitObjective){            
      write_objectives(OBJECTIVES_FILE, objectives);
      
      //TODO show some fun screen for hitting objective
    }
    else if (stepped || measurement || changeScreen){
      //update screen  
      
    }  
  } 
}

double calc_distance(double lat1, double long1, double lat2, double long2)
{
    double d2r = PI / 180.0;
    
    double dlong = (long2 - long1) * d2r;
    double dlat = (lat2 - lat1) * d2r;
    double a = pow(sin(dlat/2.0), 2) + cos(lat1*d2r) * cos(lat2*d2r) * pow(sin(dlong/2.0), 2);
    double c = 2 * atan2(sqrt(a), sqrt(1-a));
    double d = 3956 * c; 

    return d;
}

void sync(){
  //write pending activities
  if (SD.exists(SD_BASEFILE)){
    File baseFile = SD.open(SD_BASEFILE, FILE_READ);
    
    String str;
    while (baseFile.available())
      str += baseFile.read();
  
    baseFile.close();
    SD.remove(SD_BASEFILE);
  
    int left = 0;
    int right = 0;
    while (left < str.length()){
      if (str[right] == ','){
        String activityName = str.substring(left,right);
        left = right++;
        if (SD.exists(activityName)){
          File activityFile = SD.open(activityName, FILE_READ);
          String activityStr;
          while (activityFile.available())
            activityStr += activityFile.read();
          
          Firebase.setString(firebaseData, FIREBASE_ACTIVITY_PATH + activityName, activityStr);
          activityFile.close();
          SD.remove(activityName);
        }
        else
          Serial.println("File activity to sync does not exist");
      }
      else
        right++;
    }
  }


  //send completed objectives
  Objective objectives_old [NUM_OBJECTIVES];
  if (read_objectives(OBJECTIVES_FILE, objectives_old)){
    for (int i = 0; i < NUM_OBJECTIVES; i++){
      String n;
      Firebase.getString(firebaseData, FIREBASE_OBJECTIVES_PATH + String(i) + "/name", n);
      if (n == objectives_old[i].m_name){
        if (objectives_old[i].m_complete)
          Firebase.setBool(firebaseData, FIREBASE_OBJECTIVES_PATH + String(i) + "/complete", true);
        else{
          if (objectives_old[i].m_field == "steps" || objectives_old[i].m_field == "duration" || objectives_old[i].m_field == "distance")
            Firebase.setFloat(firebaseData, FIREBASE_OBJECTIVES_PATH + String(i) + "/currVal", objectives_old[i].m_currVal);       
        }
      }
    }    
  }

  //give some time for the database to update
  delay(3000);

  //read new objectives
  Objective objectives_new [NUM_OBJECTIVES];
  for (int i = 0; i < NUM_OBJECTIVES; i++){
    String str;
    Firebase.getString(firebaseData, FIREBASE_OBJECTIVES_PATH + String(i) + "/name", str);
    objectives_new[i].m_name = str;
    
    str = "";
    Firebase.getString(firebaseData, FIREBASE_OBJECTIVES_PATH + String(i) + "/rule", str);
    objectives_new[i].m_rule = str;
    if (str == "day"){
      str = "";
      Firebase.getString(firebaseData, FIREBASE_OBJECTIVES_PATH + String(i) + "/day", str);
      objectives_new[i].m_day = str;
    }
    else if (str == "time"){
      int t;
      Firebase.getInt(firebaseData, FIREBASE_OBJECTIVES_PATH + String(i) + "/hourLow", t);
      objectives_new[i].m_hourLow = t;
      Firebase.getInt(firebaseData, FIREBASE_OBJECTIVES_PATH + String(i) + "/hourHigh", t);
      objectives_new[i].m_hourHigh = t;
    }

    objectives_new[i].m_complete = false;
    Firebase.getString(firebaseData, FIREBASE_OBJECTIVES_PATH + String(i) + "/field", str);
    objectives_new[i].m_field = str;
    Firebase.getString(firebaseData, FIREBASE_OBJECTIVES_PATH + String(i) + "/goalCmp", str);
    objectives_new[i].m_goalCmp = str;
    float f;
    Firebase.getFloat(firebaseData, FIREBASE_OBJECTIVES_PATH + String(i) + "/goalVal", f);
    objectives_new[i].m_goalVal = f;
    Firebase.getFloat(firebaseData, FIREBASE_OBJECTIVES_PATH + String(i) + "/currVal", f);
    objectives_new[i].m_currVal = f;
  }

  write_objectives(OBJECTIVES_FILE, objectives_new);  
}

bool read_objectives(String filename, Objective *objectives){
  if (!SD.exists(filename))
    return false;

  File objFile = SD.open(filename, FILE_READ);

  String str;
  while (objFile.available())
    str += objFile.read();   

  String items[NUM_OBJECTIVES*NUM_OBJECTIVES_FIELDS];
  int index = 0;
  for(int i = 0; i < NUM_OBJECTIVES*NUM_OBJECTIVES_FIELDS; i++, index++){
    String s;
    while (str[index] != ','){
      s += str[index];
      index++;
    }
    items[i] = s;
  }

  for(int i = 0; i < NUM_OBJECTIVES; i++){
    objectives[i].m_name = items[i*NUM_OBJECTIVES_FIELDS + 0];
    objectives[i].m_rule = items[i*NUM_OBJECTIVES_FIELDS + 1];
    objectives[i].m_day = items[i*NUM_OBJECTIVES_FIELDS + 2];
    objectives[i].m_hourLow = items[i*NUM_OBJECTIVES_FIELDS + 3].toInt();
    objectives[i].m_hourHigh = items[i*NUM_OBJECTIVES_FIELDS + 4].toInt();
    objectives[i].m_complete = items[i*NUM_OBJECTIVES_FIELDS + 5] == "1";
    objectives[i].m_field = items[i*NUM_OBJECTIVES_FIELDS + 6];
    objectives[i].m_goalCmp = items[i*NUM_OBJECTIVES_FIELDS + 7];
    objectives[i].m_goalVal = items[i*NUM_OBJECTIVES_FIELDS + 8].toFloat();
    objectives[i].m_currVal = items[i*NUM_OBJECTIVES_FIELDS + 9].toFloat();
  }

  objFile.close();
  return true;
}

void write_objectives(String filename, Objective *objectives){
    SD.remove(filename);
    File objFile = SD.open(filename, FILE_WRITE);

    for(int i = 0; i < NUM_OBJECTIVES; i++){
      objFile.print(objectives[i].m_name + ",");
      objFile.print(objectives[i].m_rule + ",");
      objFile.print(String(objectives[i].m_day) + ",");
      objFile.print(String(objectives[i].m_hourHigh) + ",");
      objFile.print(String(objectives[i].m_complete? 1:0) + ",");
      objFile.print(objectives[i].m_field + ",");
      objFile.print(objectives[i].m_goalCmp + ",");
      objFile.print(String(objectives[i].m_goalVal) + ",");
      objFile.print(String(objectives[i].m_currVal) + ",");    
    }

    objFile.close();
}
