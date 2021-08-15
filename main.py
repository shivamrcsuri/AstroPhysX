from flask import Flask, render_template, redirect, url_for

app = Flask(__name__)

@app.route("/")
def home():
  return render_template("index.html")


@app.route("/game")
def game():
  return render_template("game.html")

if __name__ == "__main__":
    app.run(host="0.0.0.0", debug=True)
