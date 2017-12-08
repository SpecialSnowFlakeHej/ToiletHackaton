import json
import urllib2
from sense_hat import SenseHat

sense = SenseHat()
humidity = sense.get_humidity()
temp = sense.get_temperature()

data = json.dumps({"id": 111, "inside": 6, "humidity" : humidity, "temperature" : temp})

req = urllib2.Request('https://toilethackaton.eu-gb.mybluemix.net/data')
req.add_header('Content-Type', 'application/json')

response = urllib2.urlopen(req, data)

