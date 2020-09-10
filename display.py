from flask import Flask
import flask
from flask import url_for
from flask import request
from geopy.geocoders import Nominatim
import GetWeather as gw

app = Flask(__name__)


@app.route("/")
def home():
    """
    Initial page
    :return: html-template of home-page with preset location Lovisenberggata 15J, Oslo, Norway
    """
    address = "Lovisenberggata 15J"
    loc = gw.get_loc(address)
    w = gw.get_current_weather(loc)
    return flask.render_template("weather.html", address=address, name="weather_template", weather=w, icon=w["icon"])


@app.route("/new_address", methods=['GET', 'POST'])
def addr_change():
    """
    New page if user changed address
    :return: html-template of page with new location
    """

    assert request.method == 'POST'

    address = request.form["new_address"]
    loc = gw.get_loc(address)
    w = gw.get_current_weather(loc)
    return flask.render_template("weather.html", address=address, name="weather_template", weather=w, icon=w["icon"])


if __name__ == "__main__":
    app.run(debug=True)
