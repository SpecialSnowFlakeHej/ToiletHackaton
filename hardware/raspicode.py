import json
import urllib2
import time
from sense_hat import SenseHat

sense = SenseHat()
humidity = sense.get_humidity()
temp = sense.get_temperature()

lon = "lat"
lat = "lon"
reviews = "reviews"
price = "price"
last_clean = "last_clean"
last_shit = "last_shit"

while 1:
	data = json.dumps({"_id": "brno", "name": "brno", lon: 49.224286, lat: 16.593935, reviews: [], price: None, last_clean: None, last_shit: None, "type": "gateway", "temperature": temp, "humidity": humidity})
	req = urllib2.Request('https://toilethackaton.eu-gb.mybluemix.net/data')
	
	req.add_header('Content-Type', 'application/json')
	try:
		response = urllib2.urlopen(req, data)
	except:
		pass
	time.sleep(3)
	data = json.dumps({"_id": "bruno", "name": "jupiter", lon: 49.324286, lat: 16.593935, reviews: [], price: None, last_clean: None, last_shit: None, "type": "gateway", "temperature": temp, "humidity": humidity})
	req = urllib2.Request('https://toilethackaton.eu-gb.mybluemix.net/data')
	req.add_header('Content-Type', 'application/json')
	try:
		response = urllib2.urlopen(req, data)
	except:
		pass
	time.sleep(3)
	data = json.dumps({"_id": "kubo", "name": "pls no", lon: 49.424286, lat: 16.593935, reviews: [], price: None, last_clean: None, last_shit: None, "type": "gateway", "temperature": temp, "humidity": humidity})
	req = urllib2.Request('https://toilethackaton.eu-gb.mybluemix.net/data')
	req.add_header('Content-Type', 'application/json')
	try:
		response = urllib2.urlopen(req, data)
	except:
		pass
	time.sleep(3)
