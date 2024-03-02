from flask import Flask,request,jsonify;
# import util;
<<<<<<< HEAD
# app=Flask(__name__)
from flask_cors import CORS 

app = Flask(__name__)
CORS(app) 
=======
import os
from flask_cors import CORS, cross_origin
app=Flask(__name__)
cors = CORS(app)
>>>>>>> 2584b908722e493db81cb9343964f3bbab7577a3

import json;
import pickle;
import numpy as np;
__locations=None
__data_columns= None
__model=None

def get_estimated_range(model,battery,mode):
    print(model)
    print(battery)
    print(mode)
    load_saved_artifacts()
    try:
        loc_index=__data_columns.index(model.lower())
    except:
        loc_index=-1
    print('inside ramge function')

    X=np.zeros(len(__data_columns))
    X[0]=battery
    X[1]=mode
    if loc_index>=0:
        X[loc_index]=1
    print(X)
    return round(__model.predict([X])[0],2)

def get_location_names():
    print(__locations)
    print('444555')
    return __locations
def load_saved_artifacts():
    print('loading saved artifacts...start')
    global __data_columns
    global __locations

    with open("columns.json",'r') as f:
        __data_columns=json.load(f)['data_columns']
        __locations=__data_columns[2:]
    global __model
    if __model is None:
        with open('predict_range.pkl','rb') as f:
            __model=pickle.load(f)
    print('loading saved artifacts...done')


@app.route('/get_location_names')
def get_location_names():
    response = jsonify({
        'model': get_location_names()
    })
    print(response)
    print('3444')
    return response

@app.route('/predict_range', methods=['POST'])
def predict_range():
    # print('123')
    # model=request.body('model')
    # battery=request.body('battery')
    # mode=request.body('mode')
    print('req json', request.json)
    data = request.json
    model = data.get('model')
    battery = data.get('battery')
    mode = data.get('mode')
    print(model)
    print(battery)
    print(mode)
    print('456')
    try:
        loc_index=__data_columns.index(model.lower())
    except:
        loc_index=-1
    print('inside ramge function')

    X=np.zeros(len(__data_columns))
    X[0]=battery
    X[1]=mode
    if loc_index>=0:
        X[loc_index]=1
    print(X)
    # return round(__model.predict([X])[0],2)
    response = jsonify({
        'estimated_range':round(__model.predict([X])[0],2)
    })
    print('3444')
   

    return response



if __name__=="__main__":
    print("Starting Python Flask Server")
    load_saved_artifacts()
    app.run()

