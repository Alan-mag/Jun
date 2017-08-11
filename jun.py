import xml.etree.ElementTree as ET
import logging
import sys
from flask import Flask, render_template, request
import requests

# import pod and subpod classes
from pod import Pod
from subpod import Subpod

app = Flask(__name__)
reload(sys)  

sys.setdefaultencoding('utf8') 

# declare global variables
sent = False;

@app.route("/")
def main():
    return render_template('/index.html', title="Jun")

@app.route("/send", methods=['GET', 'POST'])
def send():
    sent = True;
    pods = []
    result_xml = None
    if request.method == 'POST':
        i = request.form['i']
        payload = i + "&appid=VJ8YWP-VV56V4PPV2"
        result_xml = requests.get('http://api.wolframalpha.com/v2/query?input=' + payload)
        xmlstr = result_xml.text

        root = ET.fromstring(xmlstr)

        # returns true is there is valid data found
        data_return = root.attrib.get('success')
        print data_return;

        for pod in root:
            title = pod.get('title')
            #print title
            subpods = []
            for subpodITR in pod:
                sb = Subpod(None, None, None)
                if subpodITR.get('title') is not None:
                    sb.title = subpodITR.get('title')
                if subpodITR.find('img') is not None:
                    img = subpodITR.find('img')
                    sb.img = img.get('src')
                if subpodITR.find('plaintext') is not None:
                    sb.text = subpodITR.find('plaintext').text
                subpods.append(sb)

            g = Pod(title, subpods)
            pods.append(g)
            #print g
        for pod in pods:
            print pod.title
            for element in pod.podsubpod:
                print element
            print "-------------------------"
    return render_template('/index.html', result_xml=result_xml,
                           data_return=data_return, title="Jun", pods=pods, sent=sent)

if __name__ == "__main__":
    app.run()
    