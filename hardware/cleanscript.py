import json
import urllib2
import time

while 1:
	raw_input()
	data = json.dumps({"_id": "brno"})
	req = urllib2.Request('https://toilethackaton.eu-gb.mybluemix.net/clean')
	
	req.add_header('Content-Type', 'application/json')
	try:
		response = urllib2.urlopen(req, data)
	except:
		pass
	time.sleep(3)
