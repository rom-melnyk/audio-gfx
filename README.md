# Web Audio API demo

## Before you begin
1. Run `npm install`.
1. Place one or more audio files into the `audio/` folder.
1. Update `app/config.hson` in proper way (especially the `urls` array).
  - Don't be afraid of `HSON`, it's [Human-friendly](https://github.com/timjansen/hanson) JSON _(for instance, it supports JS-like comments)._


---

## Run and develop
- **Development mode:**  
   `npm run dev`
- **Production mode:**
  1. `npm run prod`
  1. Run any server in current directory, for instance, `instant --port 8080`.
    - Make sure it's installed; run `npm install -g instant` if not.
- For **both modes,** open [http://localhost:8080/](http://localhost:8080/) in browser.
