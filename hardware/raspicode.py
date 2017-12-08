import json
import urllib2
from sense_hat import SenseHat

sense = SenseHat()
humidity = sense.get_humidity()
temp = sense.get_temperature()

data = json.dumps({"_id": "hanz na to cekal", "name": "mission impossible flute pole dance", lon: None, lat: None, reviews: [None], price: None, last_clean: None, last_shit: None, "type": "gateway"})

req = urllib2.Request('https://toilethackaton.eu-gb.mybluemix.net/data')
req.add_header('Content-Type', 'application/json')

response = urllib2.urlopen(req, data)

