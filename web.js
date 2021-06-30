/*
 * Copyright 2020 WebAssembly Community Group participants
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *     http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */

const LAYOUT_CONFIG_KEY = 'layoutConfig';

const initialProgram =
`#include <arduino_api.h>

int patternCurrent = 0;              // Current Pattern Number


//Theatre-style crawling lights with rainbow effect
void theaterChaseRainbow(uint8_t wait) {
  for (int j=0; j <= 255; j++) {     // cycle all 256 colors in the wheel
    for (int q=0; q < 3; q++) {
      for (uint16_t i=0; i < numPixels(); i=i+3) {
        setPixelColor(i+q, Wheel( (i+j) % 255));    //turn every third pixel on
      }
      show();

      delay(wait);

      for (uint16_t i=0; i < numPixels(); i=i+3) {
        setPixelColor(i+q, 0);        //turn every third pixel off
      }
    }
  }
}

// Fill the dots one after the other with a color
void colorWipe(uint32_t c, uint8_t wait) {
  for(uint16_t i=0; i<numPixels(); i++) {
    setPixelColor(i, c);
    show();
    delay(wait);
  }
}

//Rainbow effect
void rainbow(uint8_t wait) {
  uint16_t i, j;

  for(j=0; j<=255; j++) {
    for(i=0; i<numPixels(); i++) {
      setPixelColor(i, Wheel((i+j) & 255));
    }
    show();
    delay(wait);
  }
}

//Theatre-style crawling lights.
void theaterChase(uint32_t c, uint8_t wait) {
  for (int j=0; j<10; j++) {  //do 10 cycles of chasing
    for (int q=0; q < 3; q++) {
      for (uint16_t i=0; i < numPixels(); i=i+3) {
        setPixelColor(i+q, c);    //turn every third pixel on
      }
      show();

      delay(wait);

      for (uint16_t i=0; i < numPixels(); i=i+3) {
        setPixelColor(i+q, 0);        //turn every third pixel off
      }
    }
  }
}

// setup()
void setup() {
    println("\nstrandtest ... start");
}

// loop()
void loop() {
    patternCurrent++;

    // Some example procedures showing how to display to the pixels:

    if(patternCurrent == 8) { println("theaterChaseRainbow"); theaterChaseRainbow(50); }
    else if(patternCurrent == 7) { println("rainbow"); rainbow(20); }
    else if(patternCurrent == 6) { println("theaterChase Blue"); theaterChase(Color(0, 0, 127), 50); }      // Blue
    else if(patternCurrent == 5) { println("theaterChase Red"); theaterChase(Color(127, 0, 0), 50); }       // Red
    else if(patternCurrent == 4) { println("theaterChase White"); theaterChase(Color(127, 127, 127), 50); } // White
    else if(patternCurrent == 3) { println("colorWipe Blue"); colorWipe(Color(0, 0, 255), 50); }            // Blue
    else if(patternCurrent == 2) { println("colorWipe Green"); colorWipe(Color(0, 255, 0), 50); }           // Green
    else if(patternCurrent == 1) { println("colorWipe Red"); colorWipe(Color(255, 0, 0), 50); }             // Red
    if(patternCurrent >= 8) {
    	patternCurrent = 0;
	println("strandtest ... loop");
    }
}
`;

// Golden Layout
let layout = null;

function initLayout() {
  const defaultLayoutConfig = {
    settings: {
      showCloseIcon: false,
      showPopoutIcon: false,
    },
    content: [{
      type: 'row',
      content: [{
        type: 'component',
        componentName: 'editor',
        componentState: {fontSize: 18, value: initialProgram},
      }, {
        type: 'stack',
        content: [{
          type: 'component',
          componentName: 'terminal',
          componentState: {fontSize: 18},
        }, {
          type: 'component',
          componentName: 'canvas',
        }]
      }]
    }]
  };

  layout = new Layout({
    configKey: LAYOUT_CONFIG_KEY,
    defaultLayoutConfig,
  });

  layout.on('initialised', event => {
    // Editor stuff
    editor.commands.addCommand({
      name: 'run',
      bindKey: {win: 'Ctrl+Enter', mac: 'Command+Enter'},
      exec: run
    });
  });

  layout.registerComponent('canvas', CanvasComponent);
  layout.init();
}

function resetLayout() {
  localStorage.removeItem('layoutConfig');
  if (layout) {
    layout.destroy();
    layout = null;
  }
  initLayout();
}

// Toolbar stuff
$('#reset').on('click', event => { if (confirm('really reset?')) resetLayout() });
$('#run').on('click', event => run(editor));


initLayout();
