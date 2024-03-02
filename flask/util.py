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

    with open("flask/columns.json",'r') as f:
        __data_columns=json.load(f)['data_columns']
        __locations=__data_columns[2:]
    global __model
    if __model is None:
        with open('flask/predict_range.pkl','rb') as f:
            __model=pickle.load(f)
    print('loading saved artifacts...done')

if __name__=='__main__':
    load_saved_artifacts()
    print(get_location_names())
    print(get_estimated_range('Ampere Reo',9, 25))