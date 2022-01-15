#include <WiFi.h>
#include <FirebaseESP32.h>

#define FIREBASE_HOST "https://trinket-ideahacks-default-rtdb.firebaseio.com/"
#define FIREBASE_AUTH "I44ivk8FBivPIvMjlRtTWYH8J9MJ06ye8Q72jzAG"
#define WIFI_SSID "CalebAndroid"
#define WIFI_PASSWORD "wxai8878"

FirebaseData firebaseData;

void setup_WIFI();
void setup_firebase();
void turnoff_firebase();


void setup() {
  // put your setup code here, to run once:   
  Serial.begin(115200);
  setup_WIFI();
  setup_firebase();
  int test;
  Firebase.getInt(firebaseData, "/default/test", test);
  Serial.println(test);
}

void loop() {
  // put your main code here, to run repeatedly:

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
