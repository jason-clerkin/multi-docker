import React, { Component } from "react";
import axios from "axios";

class Fib extends Component {
	state = {
		seenIndexes: [],
		values: {},
		index: ""
	};

	componentDidMount() {
		// helper methods
		this.fetchValues();
		this.fetchIndexes();
	}

	async fetchValues() {
		const values = await axios.get("/api/values/current");
		this.setState({ values: values.data });
	}

	async fetchIndexes() {
		const seenIndexes = await axios.get("/api/values/all");
		this.setState({ seenIndexes: seenIndexes.data });
	}
	// bound function
	handleSubmit = async event => {
		event.preventDefault();

		await axios.post("/api/values", {
			index: this.state.index
		});
		this.setState({ index: "" });
	};

	renderSeenIndexes() {
		// iterate over every object in seenIdexes array
		// just pull out and return number property
		// join nicely and print out to screen
		return this.state.seenIndexes.map(({ number }) => number).join(", ");
	}

	renderValues() {
		const entries = [];

		for (let key in this.state.values) {
			entries.push(
				<div key={key}>
					FOR index {key} I calculated {this.state.values[key]}
				</div>
			);
		}
		return entries;
	}

	render() {
		return (
			<div>
				<form onSubmit={this.handleSubmit}>
					<label>Enter your index:</label>
					<input
						value={this.state.index}
						onChange={event => this.setState({ index: event.target.value })}
					/>
					<button>Submit</button>
				</form>

				<h3>Indicies I have seeen:</h3>
				{this.renderSeenIndexes()}

				<h3>Calculate Values:</h3>
				{this.renderValues()}
			</div>
		);
	}
}
export default Fib;