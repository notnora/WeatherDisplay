from tkinter import *
from PIL import ImageTk, Image
from io import BytesIO
import urllib
from urllib import request
import GetWeather as gw

key = '08e03aa5311fe7e6f1359b320c9d264b'


class WeatherDisplay:

    def __init__(self, master):
        address = "Lovisenberggata 15J"

        # *********** Create all elements *************
        title = Label(master)
        temp = Label(master)
        desc = Label(master)
        icon_label = Label(master)
        change_address_entry = Entry(master, text="Change address here")
        submit = Button(master, text="Change address", command=lambda:self.set_address(change_address_entry.get(),title=title,temp=temp,desc=desc,icon_label=icon_label))
        i = self.set_address(address=address, title=title, temp=temp, desc=desc, icon_label=icon_label)
        exit_button = Button(master, text="quit")
        exit_button.bind("<Button-1>", exit)


        # ********** Put all elements on grid ***********
        title.grid(row=0, columnspan=3)
        icon_label.grid(row=1, column=0)
        temp.grid(row=1, column=1)
        desc.grid(row=1, column=2)
        submit.grid(row=2, column=2)
        change_address_entry.grid(row=2, columnspan=2)
        exit_button.grid(row=10, column=10)

        icon_label.image = i




    def new_address_submission(self, event):
        print("NEW ADDR")

    def set_address(self, address, title, temp, desc, icon_label):
        location = gw.get_loc(address)
        weather = gw.get_current_weather(location)
        degree = u"\u00b0"

        titletext = "Current Weather at {}".format(address)
        temptext = "{}{}".format(weather["temperature"], degree)
        desctext = "{}".format(weather["description"])

        title.config(text=titletext)
        temp.config(text=temptext)
        desc.config(text=desctext)

        # Get icon
        # credit:
        # https://stackoverflow.com/questions/18562771/how-to-display-a-png-file-from-a-webpage-on-a-tk-label-in-python
        img_url = "http://openweathermap.org/img/w/{}.png".format(weather["icon"])
        with urllib.request.urlopen(img_url) as u:
            raw_data = u.read()
        img = Image.open(BytesIO(raw_data))
        icon = ImageTk.PhotoImage(img)
        icon_label.config(image=icon)
        icon_label.image = icon

        return icon



def exit(event):
    root.quit()


root = Tk()
root.attributes("-fullscreen", True)
root.bind("<Escape>", exit)

if __name__ == '__main__':
    WD = WeatherDisplay(root)
    root.mainloop()
