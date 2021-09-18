//import * as _ from 'lodash';
import React from 'react';
import './App.css';
import { BodyType, EyeType, MouthType, PatternType, Compose } from './Compose';
import * as c from './cattributes/colors';
import { randomEnumValue, randomKey } from './utils';


export class App extends React.Component {


//  constructor(props: any) {
//		super(props);
//	}

  public state = {
		body: randomEnumValue(BodyType),
		eye: randomEnumValue(EyeType),
		eyeColor: randomKey(c.EyeColor),
		mouth: randomEnumValue(MouthType),
		pattern: randomEnumValue(PatternType),
		primary: randomKey(c.Primary),
		secondary: randomKey(c.Secondary),
		tertiary: randomKey(c.Tertiary),
	};
  

  public render() {
    const { body, pattern, eye, mouth, primary, secondary, tertiary, eyeColor } = this.state;
    return (
      <div className="App">
        <header className="App-header">
        <Compose
                key={2}
                body={body}
                mouth={mouth}
                eye={eye}
                pattern={pattern}
                colors={[ c.Primary[primary], c.Secondary[secondary], c.Tertiary[tertiary], c.EyeColor[eyeColor]]}
              />        
        </header>
      </div>
    );
  }
}

export default App;
