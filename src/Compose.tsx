//import * as _ from 'lodash';
import * as React from 'react';
//import { Link } from 'react-router-dom';
//import { Button, Container, Divider, Grid, Header, Segment } from 'semantic-ui-react';
import { Container } from 'semantic-ui-react';
import * as c from './cattributes/colors';
import { isNonNull } from './utils';
import { Genes } from './Genes';
import nullcat_svg from './cattributes/nullcat.svg';

interface IComposeFeatures {
	colors?: string[];
	body?: BodyType;
	pattern?: PatternType;
	mouth?: MouthType;
	eye?: EyeType;
	isSpecial?: boolean;
}

export enum BodyType {
	mainecoon = 'mainecoon',
	cymric = 'cymric',
	laperm = 'laperm',
	munchkin = 'munchkin',
	sphynx = 'sphynx',
	ragamuffin = 'ragamuffin',
	himalayan = 'himalayan',
	chartreux = 'chartreux',
}

export enum PatternType {
	spock = 'spock',
	tigerpunk = 'tigerpunk',
	calicool = 'calicool',
	luckystripe = 'luckystripe',
	jaguar = 'jaguar',
	totesbasic = 'totesbasic',
}

export enum MouthType {
	whixtensions = 'whixtensions',
	dali = 'dali',
	saycheese = 'saycheese',
	beard = 'beard',
	tongue = 'tongue',
	happygokitty = 'happygokitty',
	pouty = 'pouty',
	soserious = 'soserious',
	gerbil = 'gerbil'
}

export enum EyeType {
	wingtips = 'wingtips',
	fabulous = 'fabulous',
	otaku = 'otaku',
	raisedbrow = 'raisedbrow',
	simple = 'simple',
	crazy = 'crazy',
	thicccbrowz = 'thicccbrowz',
	googly = 'googly',
}

interface IComposeState {
	kittyImage: string;
	kittyMouth: string;
	kittyEye: string;
	genes: Map<string, string>;
	loaded: boolean;
}

export class Compose extends React.Component<IComposeFeatures, IComposeState> {
	constructor(props: IComposeFeatures) {
		super(props);
		this.state = {kittyImage: "", kittyMouth: "", kittyEye: "", genes: new Map([]), loaded: false};

		this.detectKittyColors = this.detectKittyColors.bind(this);
		this.render = this.render.bind(this);
	}

	public async componentWillMount() {

		const genes = await Genes();
		this.setState({ genes });
		this.setState({loaded: true});
	}

	public async componentDidReceiveProps() {

	}
	public detectKittyColors(svgText: string) {
		const colors: string[] = ["", "", "", ""];
		for (const color in c.Primary) {
			if (svgText.indexOf(c.Primary[color]) > -1) {
				colors[0] = color;
			}
		}
		for (const color in c.Secondary) {
			if (svgText.indexOf(c.Secondary[color]) > -1) {
				colors[1] = color;
			}
		}
		for (const color in c.Tertiary) {
			if (svgText.indexOf(c.Tertiary[color]) > -1) {
				colors[2] = color;
			}
		}

		for (const color in c.EyeColor) {
			if (svgText.indexOf(c.EyeColor[color]) > -1) {
				colors[3] = color;
			}
		}

		return colors;
	}

	public render() {
		const genes = this.state.genes;
		if (genes === undefined || !this.state.loaded) {
			return <img style={styles} src={nullcat_svg} alt="Null Cat" />;
		}
		const colors = this.props.colors;
		let kittyImage = genes.get(`${this.props.body}-${this.props.pattern}`);
		let kittyMouth = genes.get(this.props.mouth!);
		let kittyEye = genes.get(this.props.eye!);

		const bodyColors = this.detectKittyColors(kittyImage!);
		const eyeColors = this.detectKittyColors(kittyEye!);
		const mouthColors = this.detectKittyColors(kittyMouth!);
		/*
		if (isNonNull(bodyColors[0])) {
			kittyImage = kittyImage!.replace(new RegExp(c.Primary[bodyColors[0]], "g"), colors![0]);
		}

		if (isNonNull(bodyColors[1])) {
			kittyImage = kittyImage!.replace(new RegExp(c.Secondary[bodyColors[1]], "g"), colors![1]);
		}

		if (isNonNull(eyeColors[3])) {
			kittyEye = kittyEye!.replace(new RegExp(c.EyeColor[eyeColors[3]], "g"), colors![3]);
		}

		if (isNonNull(bodyColors[2])) {
			kittyImage = kittyImage!.replace(new RegExp(c.Tertiary[bodyColors[2]], "g"), colors![2]);
		}

		if (isNonNull(mouthColors[0])) {
			kittyMouth = kittyMouth!.replace(new RegExp(c.Primary[mouthColors[0]], "g"), colors![0]);
		}
		*/
		// tslint:disable:jsx-no-multiline-js

		return (
			<Container style={{ position: 'relative' }}>
				{
					(kittyImage === null || kittyMouth === null || kittyEye === null ?
						<div style={{ position: 'absolute'}}>
							<img style={styles} src={nullcat_svg} alt="Null Cat"/>
						</div> :
						<div style={{ position: 'absolute'}}>
							<div style={styles} dangerouslySetInnerHTML={{ __html: kittyImage! }}/>
							<div style={styles} dangerouslySetInnerHTML={{ __html: kittyMouth! }}/>
							<div style={styles} dangerouslySetInnerHTML={{ __html: kittyEye! }}/>
						</div> )
					}
			</Container>
		);
	}

}

let styles : React.CSSProperties = { position: 'absolute', top: 0, left: 0, height: "300px", width: "300px" }
//const styles: React.CSSProperties = {
//	fixed: { position: 'absolute', top: 0, left: 0, height: "300px", width: "300px" }
//};
