#include <WiFi.h>
#include <FirebaseESP32.h>
#include <HardwareSerial.h>
#include <TinyGPSPlus.h>

#define FIREBASE_HOST "https://trinket-ideahacks-default-rtdb.firebaseio.com/"
#define FIREBASE_AUTH "I44ivk8FBivPIvMjlRtTWYH8J9MJ06ye8Q72jzAG"
#define WIFI_SSID "CalebAndroid"
#define WIFI_PASSWORD "wxai8878"

FirebaseData firebaseData;
HardwareSerial gpsSerial(2);
TinyGPSPlus gps;

void displayInfo();
void setup_WIFI();
void setup_firebase();
void turnoff_firebase();


void setup() {
  // put your setup code here, to run once:   
  Serial.begin(9600);
  gpsSerial.begin(9600);
  setup_WIFI();
  setup_firebase();
  int test;
  Firebase.getInt(firebaseData, "/default/test", test);
  Serial.println(test);
}

void loop() {
  // put your main code here, to run repeatedly:

  while (gpsSerial.available() > 0)
    if (gps.encode(gpsSerial.read()))
      displayInfo();
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
