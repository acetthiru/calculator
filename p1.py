from tkinter import *
from tkinter import messagebox

def add(var1,var2):
    var = var1+var2
    return var

def sub(var1,var2):
    var = var1-var2
    return var

def multi(var1,var2):
    var = var1*var2
    return var

def div(var1,var2):
    var = var1/var2
    return var

def fdiv(var1,var2):
    var = var1//var2
    return var

def sqr(var1):
    var = var1**2
    return var

def sqrrt(var1):
    var = var1**1/2
    return var





#second definition
def add1():
    var = int(entry.get())
    var1 = int(entry1.get())
    a=add(var,var1)
    messagebox.showinfo('ADDED',a)
def sub1():
    var = int(entry.get())
    var1 = int(entry1.get())
    s = sub(var,var1)
    messagebox.showinfo('SUBTRACTED',s)
def multi1():
    var = int(entry.get())
    var1 = int(entry1.get())
    m = multi(var,var1)
    messagebox.showinfo('MULTIPLIED',m)
def div1():
    var = int(entry.get())
    var1 = int(entry1.get())
    D = div(var,var1)
    messagebox.showinfo('DIVISION',D)
def fdiv1():
    var = int(entry.get())
    var1 = int(entry1.get())
    FD = fdiv(var,var1)
    messagebox.showinfo('FLOOR DIVISION',FD)
def sqr1():
    var = int(entry.get())
    var1 = int(entry1.get())
    SQ = sqr(var)
    messagebox.showinfo('SQUARE',SQ)
def sqrrt1():
    var = int(entry.get())
    var1 = int(entry1.get())
    SR = sqrrt(var)
    messagebox.showinfo('SQUARE ROOT',SR)
tk = Tk()
tk.title("calculator")
tk.resizable(0,0)
tk.geometry('400x400')




#button and entry defining
#button

num1 = Button(text= '+',command=add1)
num2 = Button(text= '-',command=sub1)
num3 = Button(text= '*',command=multi1)
num4 = Button(text= '/',command=div1)
num5 = Button(text= '//',command=fdiv1)
num6 = Button(text= 'x^2',command=sqr1)
num7 = Button(text= 'x^1/2',command=sqrrt1)
#entry

entry = Entry()
entry1 = Entry()






#button and entry griding and packing

#button
num1.grid()
num2.grid()
num3.grid()
num4.grid()
num5.grid()
num6.grid()
num7.grid()
#entry
entry.grid()
entry1.grid()



tk.mainloop()