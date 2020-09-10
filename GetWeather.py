from geopy.geocoders import Nominatim
import requests
from xml.dom import minidom

key = KEY


def parse_weather(weather):
    weatherdoc = minidom.parse(weather)
    timelist = weatherdoc.getElementsByTagName("time")
    templist = weatherdoc.getElementsByTagName("temperature")

    # print(len(templist))
    # print("From: {} to: {} temp: {} celsius \n".format(timelist[0].attributes["from"].value, timelist[0].attributes["to"].value, templist[0].attributes["value"].value))
    # print("From: {} to: {} temp: {} celsius \n".format(timelist[1].attributes["from"].value,
    #                                                   timelist[1].attributes["to"].value,
    #                                                   templist[1].attributes["value"].value))
    # for time in timelist:
    #    print("From: {} to {}".format(time.attributes["from"].value, time.attributes["to"].value))
    # temperature:
    # for temps in templist:
    #   print(temps.attributes["value"].value)


def get_icon(doc, symbol_id):
    url = "https://api.met.no/weatherapi/weathericon/1.1/?symbol={}&content_type=image/png"
    req = requests.get(url.format(symbol_id))


def run():
    location = get_loc(address)
    # print(location)
    # weather_out = open("weather.xml", 'w')
    # get_weather_long_term(location, weather_out)
    # get_weather_short_term(location)
    get_current_weather(location)
    # weather_out.close()
    # parse_weather("weather.json")
    # dump = open("dump.xml", 'w')
    # get_this(location, dump)
    # dump.close()


def get_this(location, dump):
    url = 'https://api.met.no/weatherapi/weathericon/1.1/available'
    req = requests.get(url)
    dump.write(req.text)


def get_weather_long_term(location, weather_out):
    """
    Requests a long term supported weather forecast from the met-api.

    :param location: An array containing latitude and longitude of a location
    :param weather_out: A file in which the response-text is written to.
    :return: The request.
    """
    # url='https://api.met.no/weatherapi/locationforecastlts/1.3/?lat=60.10&lon=9.58'
    # req = requests.get(url)

    url = 'https://api.met.no/weatherapi/locationforecastlts/1.3/?lat={}&lon={}'
    req = requests.get(url.format(location[0], location[1]))
    weather_out.write(req.text)
    return req


def get_weather_short_term(location):
    """
    Requests a short term weather forecast for a location
    :param location: An array containing latitude and longitude of a location
    :param weather_out: A file in which the response-text is written to.
    :return: The request
    """
    url = 'https://api.met.no/weatherapi/locationforecast/1.9/?lat={}&lon={}'
    req = requests.get(url.format(location[0], location[1])).json()
    # weather_out.write(req.text)
    # print(req)


def get_current_weather(location):
    """
    Requests a forecast for the next 2 hours for a location
    :param location: An array containing latitude and longitude of a location
    :param weather_out: A file in which the response-text is written to.
    :return: Weather
    """

    print("{}{}".format(location[0],location[1]))
    url = 'http://api.openweathermap.org/data/2.5/weather?lat={}&lon={}&units=Metric&appid={}'
    req = requests.get(url.format(location[0], location[1], key)).json()
    print(req)
    weather = {
        'Location': location[2],
        'temperature': req['main']['temp'],
        'description': req['weather'][0]['description'],
        'icon': req['weather'][0]['icon'],
    }

    return weather


def get_loc(address):
    """
    Gets the longitude and latitude of a particular address.
    :return:
    """
    geolocator = Nominatim(user_agent="WeatherDisplay")
    location = geolocator.geocode(address, timeout=None)
    return [location.latitude, location.longitude, address]


if __name__ == "__main__":
    run()
