require=(function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);var f=new Error("Cannot find module '"+o+"'");throw f.code="MODULE_NOT_FOUND",f}var l=n[o]={exports:{}};t[o][0].call(l.exports,function(e){var n=t[o][1][e];return s(n?n:e)},l,l.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s})({"./examples/src/app.js":[function(require,module,exports){
"use strict";

var React = require("react"),
    Select = require("react-select");

var STATES = require("./data/states");

function logChange(value) {
	console.log("Select value changed: " + value);
}

var CountrySelect = React.createClass({
	displayName: "CountrySelect",

	onClick: function onClick() {
		this.props.onSelect(this.props.value);
	},
	render: function render() {
		var className = this.props.value === this.props.selected ? "active" : "link";
		return React.createElement(
			"span",
			{ onClick: this.onClick, className: className },
			this.props.children
		);
	}
});

var StatesField = React.createClass({
	displayName: "StatesField",

	getDefaultProps: function getDefaultProps() {
		return {
			searchable: true,
			label: "States:" };
	},

	getInitialState: function getInitialState() {
		return {
			country: "AU",
			selectValue: "new-south-wales"
		};
	},
	switchCountry: function switchCountry(newCountry) {
		console.log("Country changed to " + newCountry);
		this.setState({
			country: newCountry,
			selectValue: null
		});
	},
	updateValue: function updateValue(newValue) {
		logChange("State changed to " + newValue);
		this.setState({
			selectValue: newValue || null
		});
	},
	render: function render() {
		var ops = STATES[this.state.country];
		return React.createElement(
			"div",
			null,
			React.createElement(
				"label",
				null,
				this.props.label
			),
			React.createElement(Select, { valueFieldName: "code", labelFieldName: "name", options: ops, value: this.state.selectValue, onChange: this.updateValue, searchable: this.props.searchable }),
			React.createElement(
				"div",
				{ className: "switcher" },
				"Country:",
				React.createElement(
					CountrySelect,
					{ value: "AU", selected: this.state.country, onSelect: this.switchCountry },
					"Australia"
				),
				React.createElement(
					CountrySelect,
					{ value: "US", selected: this.state.country, onSelect: this.switchCountry },
					"US"
				)
			)
		);
	}
});

var RemoteSelectField = React.createClass({
	displayName: "RemoteSelectField",

	loadOptions: function loadOptions(input, callback) {

		input = input.toLowerCase();

		var rtn = {
			options: [{ label: "One", value: "one" }, { label: "Two", value: "two" }, { label: "Three", value: "three" }],
			complete: true
		};

		if (input.slice(0, 1) === "a") {
			if (input.slice(0, 2) === "ab") {
				rtn = {
					options: [{ label: "AB", value: "ab" }, { label: "ABC", value: "abc" }, { label: "ABCD", value: "abcd" }],
					complete: true
				};
			} else {
				rtn = {
					options: [{ label: "A", value: "a" }, { label: "AA", value: "aa" }, { label: "AB", value: "ab" }],
					complete: false
				};
			}
		} else if (!input.length) {
			rtn.complete = false;
		}

		setTimeout(function () {
			callback(null, rtn);
		}, 500);
	},
	render: function render() {
		return React.createElement(
			"div",
			null,
			React.createElement(
				"label",
				null,
				this.props.label
			),
			React.createElement(Select, { asyncOptions: this.loadOptions, className: "remote-example" })
		);
	}
});

var MultiSelectField = React.createClass({
	displayName: "MultiSelectField",

	render: function render() {
		var ops = [{ label: "Chocolate", value: "chocolate" }, { label: "Vanilla", value: "vanilla" }, { label: "Strawberry", value: "strawberry" }, { label: "Caramel", value: "caramel" }, { label: "Cookies and Cream", value: "cookiescream" }, { label: "Peppermint", value: "peppermint" }];
		return React.createElement(
			"div",
			null,
			React.createElement(
				"label",
				null,
				this.props.label
			),
			React.createElement(Select, { multi: true, placeholder: "Select your favourite(s)", options: ops, onChange: logChange })
		);
	}
});

var SelectedValuesField = React.createClass({
	displayName: "SelectedValuesField",

	onLabelClick: function onLabelClick(data, event) {
		console.log(data);
	},

	render: function render() {
		var ops = [{ label: "Chocolate", value: "chocolate" }, { label: "Vanilla", value: "vanilla" }, { label: "Strawberry", value: "strawberry" }, { label: "Caramel", value: "caramel" }, { label: "Cookies and Cream", value: "cookiescream" }, { label: "Peppermint", value: "peppermint" }];
		return React.createElement(
			"div",
			null,
			React.createElement(
				"label",
				null,
				this.props.label
			),
			React.createElement(Select, {
				onOptionLabelClick: this.onLabelClick,
				value: "chocolate,vanilla,strawberry",
				multi: true,
				placeholder: "Select your favourite(s)",
				options: ops,
				onChange: logChange })
		);
	}
});

React.render(React.createElement(
	"div",
	null,
	React.createElement(SelectedValuesField, { label: "Clickable labels (labels as links):" }),
	React.createElement(StatesField, null),
	React.createElement(StatesField, { label: "States (non-searchable):", searchable: false }),
	React.createElement(MultiSelectField, { label: "Multiselect:" }),
	React.createElement(RemoteSelectField, { label: "Remote Options:" })
), document.getElementById("example"));

},{"./data/states":"C:\\Users\\Luke\\Dropbox\\Documents\\GitHub\\react-select\\examples\\src\\data\\states.js","react":false,"react-select":false}],"C:\\Users\\Luke\\Dropbox\\Documents\\GitHub\\react-select\\examples\\src\\data\\states.js":[function(require,module,exports){
"use strict";

exports.AU = [{ id: 1, code: "australian-capital-territory", name: "Australian Capital Territory" }, { id: 2, code: "new-south-wales", name: "New South Wales" }, { id: 3, code: "victoria", name: "Victoria" }, { id: 4, code: "queensland", name: "Queensland" }, { id: 5, code: "western-australia", name: "Western Australia" }, { id: 6, code: "south-australia", name: "South Australia" }, { id: 7, code: "tasmania", name: "Tasmania" }, { id: 8, code: "northern-territory", name: "Northern Territory" }];

exports.US = [{ code: "AL", name: "Alabama" }, { code: "AK", name: "Alaska" }, { code: "AS", name: "American Samoa" }, { code: "AZ", name: "Arizona" }, { code: "AR", name: "Arkansas" }, { code: "CA", name: "California" }, { code: "CO", name: "Colorado" }, { code: "CT", name: "Connecticut" }, { code: "DE", name: "Delaware" }, { code: "DC", name: "District Of Columbia" }, { code: "FM", name: "Federated States Of Micronesia" }, { code: "FL", name: "Florida" }, { code: "GA", name: "Georgia" }, { code: "GU", name: "Guam" }, { code: "HI", name: "Hawaii" }, { code: "ID", name: "Idaho" }, { code: "IL", name: "Illinois" }, { code: "IN", name: "Indiana" }, { code: "IA", name: "Iowa" }, { code: "KS", name: "Kansas" }, { code: "KY", name: "Kentucky" }, { code: "LA", name: "Louisiana" }, { code: "ME", name: "Maine" }, { code: "MH", name: "Marshall Islands" }, { code: "MD", name: "Maryland" }, { code: "MA", name: "Massachusetts" }, { code: "MI", name: "Michigan" }, { code: "MN", name: "Minnesota" }, { code: "MS", name: "Mississippi" }, { code: "MO", name: "Missouri" }, { code: "MT", name: "Montana" }, { code: "NE", name: "Nebraska" }, { code: "NV", name: "Nevada" }, { code: "NH", name: "New Hampshire" }, { code: "NJ", name: "New Jersey" }, { code: "NM", name: "New Mexico" }, { code: "NY", name: "New York" }, { code: "NC", name: "North Carolina" }, { code: "ND", name: "North Dakota" }, { code: "MP", name: "Northern Mariana Islands" }, { code: "OH", name: "Ohio" }, { code: "OK", name: "Oklahoma" }, { code: "OR", name: "Oregon" }, { code: "PW", name: "Palau" }, { code: "PA", name: "Pennsylvania" }, { code: "PR", name: "Puerto Rico" }, { code: "RI", name: "Rhode Island" }, { code: "SC", name: "South Carolina" }, { code: "SD", name: "South Dakota" }, { code: "TN", name: "Tennessee" }, { code: "TX", name: "Texas" }, { code: "UT", name: "Utah" }, { code: "VT", name: "Vermont" }, { code: "VI", name: "Virgin Islands" }, { code: "VA", name: "Virginia" }, { code: "WA", name: "Washington" }, { code: "WV", name: "West Virginia" }, { code: "WI", name: "Wisconsin" }, { code: "WY", name: "Wyoming" }];

},{}]},{},["./examples/src/app.js"])
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIm5vZGVfbW9kdWxlcy9yZWFjdC1jb21wb25lbnQtZ3VscC10YXNrcy9ub2RlX21vZHVsZXMvYnJvd3NlcmlmeS9ub2RlX21vZHVsZXMvYnJvd3Nlci1wYWNrL19wcmVsdWRlLmpzIiwiQzovVXNlcnMvTHVrZS9Ecm9wYm94L0RvY3VtZW50cy9HaXRIdWIvcmVhY3Qtc2VsZWN0L2V4YW1wbGVzL3NyYy9hcHAuanMiLCJDOi9Vc2Vycy9MdWtlL0Ryb3Bib3gvRG9jdW1lbnRzL0dpdEh1Yi9yZWFjdC1zZWxlY3QvZXhhbXBsZXMvc3JjL2RhdGEvc3RhdGVzLmpzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBOzs7QUNBQSxJQUFJLEtBQUssR0FBRyxPQUFPLENBQUMsT0FBTyxDQUFDO0lBQzNCLE1BQU0sR0FBRyxPQUFPLENBQUMsY0FBYyxDQUFDLENBQUM7O0FBRWxDLElBQUksTUFBTSxHQUFHLE9BQU8sQ0FBQyxlQUFlLENBQUMsQ0FBQzs7QUFFdEMsU0FBUyxTQUFTLENBQUMsS0FBSyxFQUFFO0FBQ3pCLFFBQU8sQ0FBQyxHQUFHLENBQUMsd0JBQXdCLEdBQUcsS0FBSyxDQUFDLENBQUM7Q0FDOUM7O0FBRUQsSUFBSSxhQUFhLEdBQUcsS0FBSyxDQUFDLFdBQVcsQ0FBQzs7O0FBQ3JDLFFBQU8sRUFBRSxtQkFBVztBQUNuQixNQUFJLENBQUMsS0FBSyxDQUFDLFFBQVEsQ0FBQyxJQUFJLENBQUMsS0FBSyxDQUFDLEtBQUssQ0FBQyxDQUFDO0VBQ3RDO0FBQ0QsT0FBTSxFQUFFLGtCQUFXO0FBQ2xCLE1BQUksU0FBUyxHQUFHLElBQUksQ0FBQyxLQUFLLENBQUMsS0FBSyxLQUFLLElBQUksQ0FBQyxLQUFLLENBQUMsUUFBUSxHQUFHLFFBQVEsR0FBRyxNQUFNLENBQUM7QUFDN0UsU0FBTzs7S0FBTSxPQUFPLEVBQUUsSUFBSSxDQUFDLE9BQU8sQUFBQyxFQUFDLFNBQVMsRUFBRSxTQUFTLEFBQUM7R0FBRSxJQUFJLENBQUMsS0FBSyxDQUFDLFFBQVE7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QUFJLEVBQUUsSUFBSSxFQUFFLElBQUksRUFBRSxnQ0FBZ0MsRUFBRSxFQUN0RCxFQUFFLElBQUksRUFBRSxJQUFJLEVBQUUsSUFBSSxFQUFFLFNBQVMsRUFBRSxFQUMvQixFQUFFLElBQUksRUFBRSxJQUFJLEVBQUUsSUFBSSxFQUFFLFNBQVMsRUFBRSxFQUMvQixFQUFFLElBQUksRUFBRSxJQUFJLEVBQUUsSUFBSSxFQUFFLE1BQU0sRUFBRSxFQUM1QixFQUFFLElBQUksRUFBRSxJQUFJLEVBQUUsSUFBSSxFQUFFLFFBQVEsRUFBRSxFQUM5QixFQUFFLElBQUksRUFBRSxJQUFJLEVBQUUsSUFBSSxFQUFFLE9BQU8sRUFBRSxFQUM3QixFQUFFLElBQUksRUFBRSxJQUFJLEVBQUUsSUFBSSxFQUFFLFVBQVUsRUFBRSxFQUNoQyxFQUFFLElBQUksRUFBRSxJQUFJLEVBQUUsSUFBSSxFQUFFLFNBQVMsRUFBRSxFQUMvQixFQUFFLElBQUksRUFBRSxJQUFJLEVBQUUsSUFBSSxFQUFFLE1BQU0sRUFBRSxFQUM1QixFQUFFLElBQUksRUFBRSxJQUFJLEVBQUUsSUFBSSxFQUFFLFFBQVEsRUFBRSxFQUM5QixFQUFFLElBQUksRUFBRSxJQUFJLEVBQUUsSUFBSSxFQUFFLFVBQVUsRUFBRSxFQUNoQyxFQUFFLElBQUksRUFBRSxJQUFJLEVBQUUsSUFBSSxFQUFFLFdBQVcsRUFBRSxFQUNqQyxFQUFFLElBQUksRUFBRSxJQUFJLEVBQUUsSUFBSSxFQUFFLE9BQU8sRUFBRSxFQUM3QixFQUFFLElBQUksRUFBRSxJQUFJLEVBQUUsSUFBSSxFQUFFLGtCQUFrQixFQUFFLEVBQ3hDLEVBQUUsSUFBSSxFQUFFLElBQUksRUFBRSxJQUFJLEVBQUUsVUFBVSxFQUFFLEVBQ2hDLEVBQUUsSUFBSSxFQUFFLElBQUksRUFBRSxJQUFJLEVBQUUsZUFBZSxFQUFFLEVBQ3JDLEVBQUUsSUFBSSxFQUFFLElBQUksRUFBRSxJQUFJLEVBQUUsVUFBVSxFQUFFLEVBQ2hDLEVBQUUsSUFBSSxFQUFFLElBQUksRUFBRSxJQUFJLEVBQUUsV0FBVyxFQUFFLEVBQ2pDLEVBQUUsSUFBSSxFQUFFLElBQUksRUFBRSxJQUFJLEVBQUUsYUFBYSxFQUFFLEVBQ25DLEVBQUUsSUFBSSxFQUFFLElBQUksRUFBRSxJQUFJLEVBQUUsVUFBVSxFQUFFLEVBQ2hDLEVBQUUsSUFBSSxFQUFFLElBQUksRUFBRSxJQUFJLEVBQUUsU0FBUyxFQUFFLEVBQy9CLEVBQUUsSUFBSSxFQUFFLElBQUksRUFBRSxJQUFJLEVBQUUsVUFBVSxFQUFFLEVBQ2hDLEVBQUUsSUFBSSxFQUFFLElBQUksRUFBRSxJQUFJLEVBQUUsUUFBUSxFQUFFLEVBQzlCLEVBQUUsSUFBSSxFQUFFLElBQUksRUFBRSxJQUFJLEVBQUUsZUFBZSxFQUFFLEVBQ3JDLEVBQUUsSUFBSSxFQUFFLElBQUksRUFBRSxJQUFJLEVBQUUsWUFBWSxFQUFFLEVBQ2xDLEVBQUUsSUFBSSxFQUFFLElBQUksRUFBRSxJQUFJLEVBQUUsWUFBWSxFQUFFLEVBQ2xDLEVBQUUsSUFBSSxFQUFFLElBQUksRUFBRSxJQUFJLEVBQUUsVUFBVSxFQUFFLEVBQ2hDLEVBQUUsSUFBSSxFQUFFLElBQUksRUFBRSxJQUFJLEVBQUUsZ0JBQWdCLEVBQUUsRUFDdEMsRUFBRSxJQUFJLEVBQUUsSUFBSSxFQUFFLElBQUksRUFBRSxjQUFjLEVBQUUsRUFDcEMsRUFBRSxJQUFJLEVBQUUsSUFBSSxFQUFFLElBQUksRUFBRSwwQkFBMEIsRUFBRSxFQUNoRCxFQUFFLElBQUksRUFBRSxJQUFJLEVBQUUsSUFBSSxFQUFFLE1BQU0sRUFBRSxFQUM1QixFQUFFLElBQUksRUFBRSxJQUFJLEVBQUUsSUFBSSxFQUFFLFVBQVUsRUFBRSxFQUNoQyxFQUFFLElBQUksRUFBRSxJQUFJLEVBQUUsSUFBSSxFQUFFLFFBQVEsRUFBRSxFQUM5QixFQUFFLElBQUksRUFBRSxJQUFJLEVBQUUsSUFBSSxFQUFFLE9BQU8sRUFBRSxFQUM3QixFQUFFLElBQUksRUFBRSxJQUFJLEVBQUUsSUFBSSxFQUFFLGNBQWMsRUFBRSxFQUNwQyxFQUFFLElBQUksRUFBRSxJQUFJLEVBQUUsSUFBSSxFQUFFLGFBQWEsRUFBRSxFQUNuQyxFQUFFLElBQUksRUFBRSxJQUFJLEVBQUUsSUFBSSxFQUFFLGNBQWMsRUFBRSxFQUNwQyxFQUFFLElBQUksRUFBRSxJQUFJLEVBQUUsSUFBSSxFQUFFLGdCQUFnQixFQUFFLEVBQ3RDLEVBQUUsSUFBSSxFQUFFLElBQUksRUFBRSxJQUFJLEVBQUUsY0FBYyxFQUFFLEVBQ3BDLEVBQUUsSUFBSSxFQUFFLElBQUksRUFBRSxJQUFJLEVBQUUsV0FBVyxFQUFFLEVBQ2pDLEVBQUUsSUFBSSxFQUFFLElBQUksRUFBRSxJQUFJLEVBQUUsT0FBTyxFQUFFLEVBQzdCLEVBQUUsSUFBSSxFQUFFLElBQUksRUFBRSxJQUFJLEVBQUUsTUFBTSxFQUFFLEVBQzVCLEVBQUUsSUFBSSxFQUFFLElBQUksRUFBRSxJQUFJLEVBQUUsU0FBUyxFQUFFLEVBQy9CLEVBQUUsSUFBSSxFQUFFLElBQUksRUFBRSxJQUFJLEVBQUUsZ0JBQWdCLEVBQUUsRUFDdEMsRUFBRSxJQUFJLEVBQUUsSUFBSSxFQUFFLElBQUksRUFBRSxVQUFVLEVBQUUsRUFDaEMsRUFBRSxJQUFJLEVBQUUsSUFBSSxFQUFFLElBQUksRUFBRSxZQUFZLEVBQUUsRUFDbEMsRUFBRSxJQUFJLEVBQUUsSUFBSSxFQUFFLElBQUksRUFBRSxlQUFlLEVBQUUsRUFDckMsRUFBRSxJQUFJLEVBQUUsSUFBSSxFQUFFLElBQUksRUFBRSxXQUFXLEVBQUUsRUFDakMsRUFBRSxJQUFJLEVBQUUsSUFBSSxFQUFFLElBQUksRUFBRSxTQUFTLEVBQUUsQ0FDbEMsQ0FBQyIsImZpbGUiOiJnZW5lcmF0ZWQuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlc0NvbnRlbnQiOlsiKGZ1bmN0aW9uIGUodCxuLHIpe2Z1bmN0aW9uIHMobyx1KXtpZighbltvXSl7aWYoIXRbb10pe3ZhciBhPXR5cGVvZiByZXF1aXJlPT1cImZ1bmN0aW9uXCImJnJlcXVpcmU7aWYoIXUmJmEpcmV0dXJuIGEobywhMCk7aWYoaSlyZXR1cm4gaShvLCEwKTt2YXIgZj1uZXcgRXJyb3IoXCJDYW5ub3QgZmluZCBtb2R1bGUgJ1wiK28rXCInXCIpO3Rocm93IGYuY29kZT1cIk1PRFVMRV9OT1RfRk9VTkRcIixmfXZhciBsPW5bb109e2V4cG9ydHM6e319O3Rbb11bMF0uY2FsbChsLmV4cG9ydHMsZnVuY3Rpb24oZSl7dmFyIG49dFtvXVsxXVtlXTtyZXR1cm4gcyhuP246ZSl9LGwsbC5leHBvcnRzLGUsdCxuLHIpfXJldHVybiBuW29dLmV4cG9ydHN9dmFyIGk9dHlwZW9mIHJlcXVpcmU9PVwiZnVuY3Rpb25cIiYmcmVxdWlyZTtmb3IodmFyIG89MDtvPHIubGVuZ3RoO28rKylzKHJbb10pO3JldHVybiBzfSkiLCJ2YXIgUmVhY3QgPSByZXF1aXJlKCdyZWFjdCcpLFxyXG5cdFNlbGVjdCA9IHJlcXVpcmUoJ3JlYWN0LXNlbGVjdCcpO1xyXG5cclxudmFyIFNUQVRFUyA9IHJlcXVpcmUoJy4vZGF0YS9zdGF0ZXMnKTtcclxuXHJcbmZ1bmN0aW9uIGxvZ0NoYW5nZSh2YWx1ZSkge1xyXG5cdGNvbnNvbGUubG9nKCdTZWxlY3QgdmFsdWUgY2hhbmdlZDogJyArIHZhbHVlKTtcclxufVxyXG5cclxudmFyIENvdW50cnlTZWxlY3QgPSBSZWFjdC5jcmVhdGVDbGFzcyh7XHJcblx0b25DbGljazogZnVuY3Rpb24oKSB7XHJcblx0XHR0aGlzLnByb3BzLm9uU2VsZWN0KHRoaXMucHJvcHMudmFsdWUpO1xyXG5cdH0sXHJcblx0cmVuZGVyOiBmdW5jdGlvbigpIHtcclxuXHRcdHZhciBjbGFzc05hbWUgPSB0aGlzLnByb3BzLnZhbHVlID09PSB0aGlzLnByb3BzLnNlbGVjdGVkID8gJ2FjdGl2ZScgOiAnbGluayc7XHJcblx0XHRyZXR1cm4gPHNwYW4gb25DbGljaz17dGhpcy5vbkNsaWNrfSBjbGFzc05hbWU9e2NsYXNzTmFtZX0+e3RoaXMucHJvcHMuY2hpbGRyZW59PC9zcGFuPjtcclxuXHR9XHJcbn0pO1xyXG5cclxudmFyIFN0YXRlc0ZpZWxkID0gUmVhY3QuY3JlYXRlQ2xhc3Moe1xyXG5cdGdldERlZmF1bHRQcm9wczogZnVuY3Rpb24gKCkge1xyXG5cdFx0cmV0dXJuIHtcclxuXHRcdFx0c2VhcmNoYWJsZTogdHJ1ZSxcclxuXHRcdFx0bGFiZWw6ICdTdGF0ZXM6JyxcclxuXHRcdH07XHJcblx0fSxcclxuXHJcblx0Z2V0SW5pdGlhbFN0YXRlOiBmdW5jdGlvbigpIHtcclxuXHRcdHJldHVybiB7XHJcblx0XHRcdGNvdW50cnk6ICdBVScsXHJcblx0XHRcdHNlbGVjdFZhbHVlOiAnbmV3LXNvdXRoLXdhbGVzJ1xyXG5cdFx0fTtcclxuXHR9LFxyXG5cdHN3aXRjaENvdW50cnk6IGZ1bmN0aW9uKG5ld0NvdW50cnkpIHtcclxuXHRcdGNvbnNvbGUubG9nKCdDb3VudHJ5IGNoYW5nZWQgdG8gJyArIG5ld0NvdW50cnkpO1xyXG5cdFx0dGhpcy5zZXRTdGF0ZSh7XHJcblx0XHRcdGNvdW50cnk6IG5ld0NvdW50cnksXHJcblx0XHRcdHNlbGVjdFZhbHVlOiBudWxsXHJcblx0XHR9KTtcclxuXHR9LFxyXG5cdHVwZGF0ZVZhbHVlOiBmdW5jdGlvbihuZXdWYWx1ZSkge1xyXG5cdFx0bG9nQ2hhbmdlKCdTdGF0ZSBjaGFuZ2VkIHRvICcgKyBuZXdWYWx1ZSk7XHJcblx0XHR0aGlzLnNldFN0YXRlKHtcclxuXHRcdFx0c2VsZWN0VmFsdWU6IG5ld1ZhbHVlIHx8IG51bGxcclxuXHRcdH0pO1xyXG5cdH0sXHJcblx0cmVuZGVyOiBmdW5jdGlvbigpIHtcclxuXHRcdHZhciBvcHMgPSBTVEFURVNbdGhpcy5zdGF0ZS5jb3VudHJ5XTtcclxuXHRcdHJldHVybiAoXHJcblx0XHRcdDxkaXY+XHJcblx0XHRcdFx0PGxhYmVsPnt0aGlzLnByb3BzLmxhYmVsfTwvbGFiZWw+XHJcblx0XHRcdFx0PFNlbGVjdCB2YWx1ZUZpZWxkTmFtZT0nY29kZScgbGFiZWxGaWVsZE5hbWU9J25hbWUnIG9wdGlvbnM9e29wc30gdmFsdWU9e3RoaXMuc3RhdGUuc2VsZWN0VmFsdWV9IG9uQ2hhbmdlPXt0aGlzLnVwZGF0ZVZhbHVlfSBzZWFyY2hhYmxlPXt0aGlzLnByb3BzLnNlYXJjaGFibGV9IC8+XHJcblx0XHRcdFx0PGRpdiBjbGFzc05hbWU9XCJzd2l0Y2hlclwiPlxyXG5cdFx0XHRcdFx0Q291bnRyeTpcclxuXHRcdFx0XHRcdDxDb3VudHJ5U2VsZWN0IHZhbHVlPVwiQVVcIiBzZWxlY3RlZD17dGhpcy5zdGF0ZS5jb3VudHJ5fSBvblNlbGVjdD17dGhpcy5zd2l0Y2hDb3VudHJ5fT5BdXN0cmFsaWE8L0NvdW50cnlTZWxlY3Q+XHJcblx0XHRcdFx0XHQ8Q291bnRyeVNlbGVjdCB2YWx1ZT1cIlVTXCIgc2VsZWN0ZWQ9e3RoaXMuc3RhdGUuY291bnRyeX0gb25TZWxlY3Q9e3RoaXMuc3dpdGNoQ291bnRyeX0+VVM8L0NvdW50cnlTZWxlY3Q+XHJcblx0XHRcdFx0PC9kaXY+XHJcblx0XHRcdDwvZGl2PlxyXG5cdFx0KTtcclxuXHR9XHJcbn0pO1xyXG5cclxudmFyIFJlbW90ZVNlbGVjdEZpZWxkID0gUmVhY3QuY3JlYXRlQ2xhc3Moe1xyXG5cdGxvYWRPcHRpb25zOiBmdW5jdGlvbihpbnB1dCwgY2FsbGJhY2spIHtcclxuXHJcblx0XHRpbnB1dCA9IGlucHV0LnRvTG93ZXJDYXNlKCk7XHJcblxyXG5cdFx0dmFyIHJ0biA9IHtcclxuXHRcdFx0b3B0aW9uczogW1xyXG5cdFx0XHRcdHsgbGFiZWw6ICdPbmUnLCB2YWx1ZTogJ29uZScgfSxcclxuXHRcdFx0XHR7IGxhYmVsOiAnVHdvJywgdmFsdWU6ICd0d28nIH0sXHJcblx0XHRcdFx0eyBsYWJlbDogJ1RocmVlJywgdmFsdWU6ICd0aHJlZScgfVxyXG5cdFx0XHRdLFxyXG5cdFx0XHRjb21wbGV0ZTogdHJ1ZVxyXG5cdFx0fTtcclxuXHJcblx0XHRpZiAoaW5wdXQuc2xpY2UoMCwxKSA9PT0gJ2EnKSB7XHJcblx0XHRcdGlmIChpbnB1dC5zbGljZSgwLDIpID09PSAnYWInKSB7XHJcblx0XHRcdFx0cnRuID0ge1xyXG5cdFx0XHRcdFx0b3B0aW9uczogW1xyXG5cdFx0XHRcdFx0XHR7IGxhYmVsOiAnQUInLCB2YWx1ZTogJ2FiJyB9LFxyXG5cdFx0XHRcdFx0XHR7IGxhYmVsOiAnQUJDJywgdmFsdWU6ICdhYmMnIH0sXHJcblx0XHRcdFx0XHRcdHsgbGFiZWw6ICdBQkNEJywgdmFsdWU6ICdhYmNkJyB9XHJcblx0XHRcdFx0XHRdLFxyXG5cdFx0XHRcdFx0Y29tcGxldGU6IHRydWVcclxuXHRcdFx0XHR9O1xyXG5cdFx0XHR9IGVsc2Uge1xyXG5cdFx0XHRcdHJ0biA9IHtcclxuXHRcdFx0XHRcdG9wdGlvbnM6IFtcclxuXHRcdFx0XHRcdFx0eyBsYWJlbDogJ0EnLCB2YWx1ZTogJ2EnIH0sXHJcblx0XHRcdFx0XHRcdHsgbGFiZWw6ICdBQScsIHZhbHVlOiAnYWEnIH0sXHJcblx0XHRcdFx0XHRcdHsgbGFiZWw6ICdBQicsIHZhbHVlOiAnYWInIH1cclxuXHRcdFx0XHRcdF0sXHJcblx0XHRcdFx0XHRjb21wbGV0ZTogZmFsc2VcclxuXHRcdFx0XHR9O1xyXG5cdFx0XHR9XHJcblx0XHR9IGVsc2UgaWYgKCFpbnB1dC5sZW5ndGgpIHtcclxuXHRcdFx0cnRuLmNvbXBsZXRlID0gZmFsc2U7XHJcblx0XHR9XHJcblxyXG5cdFx0c2V0VGltZW91dChmdW5jdGlvbigpIHtcclxuXHRcdFx0Y2FsbGJhY2sobnVsbCwgcnRuKTtcclxuXHRcdH0sIDUwMCk7XHJcblxyXG5cdH0sXHJcblx0cmVuZGVyOiBmdW5jdGlvbigpIHtcclxuXHRcdHJldHVybiA8ZGl2PlxyXG5cdFx0XHQ8bGFiZWw+e3RoaXMucHJvcHMubGFiZWx9PC9sYWJlbD5cclxuXHRcdFx0PFNlbGVjdCBhc3luY09wdGlvbnM9e3RoaXMubG9hZE9wdGlvbnN9IGNsYXNzTmFtZT1cInJlbW90ZS1leGFtcGxlXCIgLz5cclxuXHRcdDwvZGl2PjtcclxuXHR9XHJcbn0pO1xyXG5cclxuXHJcbnZhciBNdWx0aVNlbGVjdEZpZWxkID0gUmVhY3QuY3JlYXRlQ2xhc3Moe1xyXG5cdHJlbmRlcjogZnVuY3Rpb24oKSB7XHJcblx0XHR2YXIgb3BzID0gW1xyXG5cdFx0XHR7IGxhYmVsOiAnQ2hvY29sYXRlJywgdmFsdWU6ICdjaG9jb2xhdGUnIH0sXHJcblx0XHRcdHsgbGFiZWw6ICdWYW5pbGxhJywgdmFsdWU6ICd2YW5pbGxhJyB9LFxyXG5cdFx0XHR7IGxhYmVsOiAnU3RyYXdiZXJyeScsIHZhbHVlOiAnc3RyYXdiZXJyeScgfSxcclxuXHRcdFx0eyBsYWJlbDogJ0NhcmFtZWwnLCB2YWx1ZTogJ2NhcmFtZWwnIH0sXHJcblx0XHRcdHsgbGFiZWw6ICdDb29raWVzIGFuZCBDcmVhbScsIHZhbHVlOiAnY29va2llc2NyZWFtJyB9LFxyXG5cdFx0XHR7IGxhYmVsOiAnUGVwcGVybWludCcsIHZhbHVlOiAncGVwcGVybWludCcgfVxyXG5cdFx0XTtcclxuXHRcdHJldHVybiA8ZGl2PlxyXG5cdFx0XHQ8bGFiZWw+e3RoaXMucHJvcHMubGFiZWx9PC9sYWJlbD5cclxuXHRcdFx0PFNlbGVjdCBtdWx0aT17dHJ1ZX0gcGxhY2Vob2xkZXI9XCJTZWxlY3QgeW91ciBmYXZvdXJpdGUocylcIiBvcHRpb25zPXtvcHN9IG9uQ2hhbmdlPXtsb2dDaGFuZ2V9IC8+XHJcblx0XHQ8L2Rpdj47XHJcblx0fVxyXG59KTtcclxuXHJcbnZhciBTZWxlY3RlZFZhbHVlc0ZpZWxkID0gUmVhY3QuY3JlYXRlQ2xhc3Moe1xyXG5cclxuXHRvbkxhYmVsQ2xpY2s6IGZ1bmN0aW9uIChkYXRhLCBldmVudCkge1xyXG5cdFx0Y29uc29sZS5sb2coZGF0YSk7XHJcblx0fSxcclxuXHJcblx0cmVuZGVyOiBmdW5jdGlvbigpIHtcclxuXHRcdHZhciBvcHMgPSBbXHJcblx0XHRcdHsgbGFiZWw6ICdDaG9jb2xhdGUnLCB2YWx1ZTogJ2Nob2NvbGF0ZScgfSxcclxuXHRcdFx0eyBsYWJlbDogJ1ZhbmlsbGEnLCB2YWx1ZTogJ3ZhbmlsbGEnIH0sXHJcblx0XHRcdHsgbGFiZWw6ICdTdHJhd2JlcnJ5JywgdmFsdWU6ICdzdHJhd2JlcnJ5JyB9LFxyXG5cdFx0XHR7IGxhYmVsOiAnQ2FyYW1lbCcsIHZhbHVlOiAnY2FyYW1lbCcgfSxcclxuXHRcdFx0eyBsYWJlbDogJ0Nvb2tpZXMgYW5kIENyZWFtJywgdmFsdWU6ICdjb29raWVzY3JlYW0nIH0sXHJcblx0XHRcdHsgbGFiZWw6ICdQZXBwZXJtaW50JywgdmFsdWU6ICdwZXBwZXJtaW50JyB9XHJcblx0XHRdO1xyXG5cdFx0cmV0dXJuIDxkaXY+XHJcblx0XHRcdDxsYWJlbD57dGhpcy5wcm9wcy5sYWJlbH08L2xhYmVsPlxyXG5cdFx0XHQ8U2VsZWN0XHJcblx0XHRcdFx0b25PcHRpb25MYWJlbENsaWNrPXt0aGlzLm9uTGFiZWxDbGlja31cclxuXHRcdFx0XHR2YWx1ZT1cImNob2NvbGF0ZSx2YW5pbGxhLHN0cmF3YmVycnlcIlxyXG5cdFx0XHRcdG11bHRpPXt0cnVlfVxyXG5cdFx0XHRcdHBsYWNlaG9sZGVyPVwiU2VsZWN0IHlvdXIgZmF2b3VyaXRlKHMpXCJcclxuXHRcdFx0XHRvcHRpb25zPXtvcHN9XHJcblx0XHRcdFx0b25DaGFuZ2U9e2xvZ0NoYW5nZX0gLz5cclxuXHRcdDwvZGl2PjtcclxuXHR9XHJcbn0pO1xyXG5cclxuXHJcblJlYWN0LnJlbmRlcihcclxuXHQ8ZGl2PlxyXG5cdFx0PFNlbGVjdGVkVmFsdWVzRmllbGQgbGFiZWw9XCJDbGlja2FibGUgbGFiZWxzIChsYWJlbHMgYXMgbGlua3MpOlwiIC8+XHJcblx0XHQ8U3RhdGVzRmllbGQgLz5cclxuXHRcdDxTdGF0ZXNGaWVsZCBsYWJlbD1cIlN0YXRlcyAobm9uLXNlYXJjaGFibGUpOlwiIHNlYXJjaGFibGU9e2ZhbHNlfSAvPlxyXG5cdFx0PE11bHRpU2VsZWN0RmllbGQgbGFiZWw9XCJNdWx0aXNlbGVjdDpcIi8+XHJcblx0XHQ8UmVtb3RlU2VsZWN0RmllbGQgbGFiZWw9XCJSZW1vdGUgT3B0aW9uczpcIi8+XHJcblx0PC9kaXY+LFxyXG5cdGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKCdleGFtcGxlJylcclxuKTtcclxuIiwiZXhwb3J0cy5BVSA9IFtcclxuXHR7IGlkOjEsIGNvZGU6ICdhdXN0cmFsaWFuLWNhcGl0YWwtdGVycml0b3J5JywgbmFtZTogJ0F1c3RyYWxpYW4gQ2FwaXRhbCBUZXJyaXRvcnknIH0sXHJcblx0eyBpZDoyLCBjb2RlOiAnbmV3LXNvdXRoLXdhbGVzJywgbmFtZTogJ05ldyBTb3V0aCBXYWxlcycgfSxcclxuXHR7IGlkOjMsIGNvZGU6ICd2aWN0b3JpYScsIG5hbWU6ICdWaWN0b3JpYScgfSxcclxuXHR7IGlkOjQsIGNvZGU6ICdxdWVlbnNsYW5kJywgbmFtZTogJ1F1ZWVuc2xhbmQnIH0sXHJcblx0eyBpZDo1LCBjb2RlOiAnd2VzdGVybi1hdXN0cmFsaWEnLCBuYW1lOiAnV2VzdGVybiBBdXN0cmFsaWEnIH0sXHJcblx0eyBpZDo2LCBjb2RlOiAnc291dGgtYXVzdHJhbGlhJywgbmFtZTogJ1NvdXRoIEF1c3RyYWxpYScgfSxcclxuXHR7IGlkOjcsIGNvZGU6ICd0YXNtYW5pYScsIG5hbWU6ICdUYXNtYW5pYScgfSxcclxuXHR7IGlkOjgsIGNvZGU6ICdub3J0aGVybi10ZXJyaXRvcnknLCBuYW1lOiAnTm9ydGhlcm4gVGVycml0b3J5JyB9XHJcbl07XHJcblxyXG5leHBvcnRzLlVTID0gW1xyXG4gICAgeyBjb2RlOiAnQUwnLCBuYW1lOiAnQWxhYmFtYScgfSxcclxuICAgIHsgY29kZTogJ0FLJywgbmFtZTogJ0FsYXNrYScgfSxcclxuICAgIHsgY29kZTogJ0FTJywgbmFtZTogJ0FtZXJpY2FuIFNhbW9hJyB9LFxyXG4gICAgeyBjb2RlOiAnQVonLCBuYW1lOiAnQXJpem9uYScgfSxcclxuICAgIHsgY29kZTogJ0FSJywgbmFtZTogJ0Fya2Fuc2FzJyB9LFxyXG4gICAgeyBjb2RlOiAnQ0EnLCBuYW1lOiAnQ2FsaWZvcm5pYScgfSxcclxuICAgIHsgY29kZTogJ0NPJywgbmFtZTogJ0NvbG9yYWRvJyB9LFxyXG4gICAgeyBjb2RlOiAnQ1QnLCBuYW1lOiAnQ29ubmVjdGljdXQnIH0sXHJcbiAgICB7IGNvZGU6ICdERScsIG5hbWU6ICdEZWxhd2FyZScgfSxcclxuICAgIHsgY29kZTogJ0RDJywgbmFtZTogJ0Rpc3RyaWN0IE9mIENvbHVtYmlhJyB9LFxyXG4gICAgeyBjb2RlOiAnRk0nLCBuYW1lOiAnRmVkZXJhdGVkIFN0YXRlcyBPZiBNaWNyb25lc2lhJyB9LFxyXG4gICAgeyBjb2RlOiAnRkwnLCBuYW1lOiAnRmxvcmlkYScgfSxcclxuICAgIHsgY29kZTogJ0dBJywgbmFtZTogJ0dlb3JnaWEnIH0sXHJcbiAgICB7IGNvZGU6ICdHVScsIG5hbWU6ICdHdWFtJyB9LFxyXG4gICAgeyBjb2RlOiAnSEknLCBuYW1lOiAnSGF3YWlpJyB9LFxyXG4gICAgeyBjb2RlOiAnSUQnLCBuYW1lOiAnSWRhaG8nIH0sXHJcbiAgICB7IGNvZGU6ICdJTCcsIG5hbWU6ICdJbGxpbm9pcycgfSxcclxuICAgIHsgY29kZTogJ0lOJywgbmFtZTogJ0luZGlhbmEnIH0sXHJcbiAgICB7IGNvZGU6ICdJQScsIG5hbWU6ICdJb3dhJyB9LFxyXG4gICAgeyBjb2RlOiAnS1MnLCBuYW1lOiAnS2Fuc2FzJyB9LFxyXG4gICAgeyBjb2RlOiAnS1knLCBuYW1lOiAnS2VudHVja3knIH0sXHJcbiAgICB7IGNvZGU6ICdMQScsIG5hbWU6ICdMb3Vpc2lhbmEnIH0sXHJcbiAgICB7IGNvZGU6ICdNRScsIG5hbWU6ICdNYWluZScgfSxcclxuICAgIHsgY29kZTogJ01IJywgbmFtZTogJ01hcnNoYWxsIElzbGFuZHMnIH0sXHJcbiAgICB7IGNvZGU6ICdNRCcsIG5hbWU6ICdNYXJ5bGFuZCcgfSxcclxuICAgIHsgY29kZTogJ01BJywgbmFtZTogJ01hc3NhY2h1c2V0dHMnIH0sXHJcbiAgICB7IGNvZGU6ICdNSScsIG5hbWU6ICdNaWNoaWdhbicgfSxcclxuICAgIHsgY29kZTogJ01OJywgbmFtZTogJ01pbm5lc290YScgfSxcclxuICAgIHsgY29kZTogJ01TJywgbmFtZTogJ01pc3Npc3NpcHBpJyB9LFxyXG4gICAgeyBjb2RlOiAnTU8nLCBuYW1lOiAnTWlzc291cmknIH0sXHJcbiAgICB7IGNvZGU6ICdNVCcsIG5hbWU6ICdNb250YW5hJyB9LFxyXG4gICAgeyBjb2RlOiAnTkUnLCBuYW1lOiAnTmVicmFza2EnIH0sXHJcbiAgICB7IGNvZGU6ICdOVicsIG5hbWU6ICdOZXZhZGEnIH0sXHJcbiAgICB7IGNvZGU6ICdOSCcsIG5hbWU6ICdOZXcgSGFtcHNoaXJlJyB9LFxyXG4gICAgeyBjb2RlOiAnTkonLCBuYW1lOiAnTmV3IEplcnNleScgfSxcclxuICAgIHsgY29kZTogJ05NJywgbmFtZTogJ05ldyBNZXhpY28nIH0sXHJcbiAgICB7IGNvZGU6ICdOWScsIG5hbWU6ICdOZXcgWW9yaycgfSxcclxuICAgIHsgY29kZTogJ05DJywgbmFtZTogJ05vcnRoIENhcm9saW5hJyB9LFxyXG4gICAgeyBjb2RlOiAnTkQnLCBuYW1lOiAnTm9ydGggRGFrb3RhJyB9LFxyXG4gICAgeyBjb2RlOiAnTVAnLCBuYW1lOiAnTm9ydGhlcm4gTWFyaWFuYSBJc2xhbmRzJyB9LFxyXG4gICAgeyBjb2RlOiAnT0gnLCBuYW1lOiAnT2hpbycgfSxcclxuICAgIHsgY29kZTogJ09LJywgbmFtZTogJ09rbGFob21hJyB9LFxyXG4gICAgeyBjb2RlOiAnT1InLCBuYW1lOiAnT3JlZ29uJyB9LFxyXG4gICAgeyBjb2RlOiAnUFcnLCBuYW1lOiAnUGFsYXUnIH0sXHJcbiAgICB7IGNvZGU6ICdQQScsIG5hbWU6ICdQZW5uc3lsdmFuaWEnIH0sXHJcbiAgICB7IGNvZGU6ICdQUicsIG5hbWU6ICdQdWVydG8gUmljbycgfSxcclxuICAgIHsgY29kZTogJ1JJJywgbmFtZTogJ1Job2RlIElzbGFuZCcgfSxcclxuICAgIHsgY29kZTogJ1NDJywgbmFtZTogJ1NvdXRoIENhcm9saW5hJyB9LFxyXG4gICAgeyBjb2RlOiAnU0QnLCBuYW1lOiAnU291dGggRGFrb3RhJyB9LFxyXG4gICAgeyBjb2RlOiAnVE4nLCBuYW1lOiAnVGVubmVzc2VlJyB9LFxyXG4gICAgeyBjb2RlOiAnVFgnLCBuYW1lOiAnVGV4YXMnIH0sXHJcbiAgICB7IGNvZGU6ICdVVCcsIG5hbWU6ICdVdGFoJyB9LFxyXG4gICAgeyBjb2RlOiAnVlQnLCBuYW1lOiAnVmVybW9udCcgfSxcclxuICAgIHsgY29kZTogJ1ZJJywgbmFtZTogJ1ZpcmdpbiBJc2xhbmRzJyB9LFxyXG4gICAgeyBjb2RlOiAnVkEnLCBuYW1lOiAnVmlyZ2luaWEnIH0sXHJcbiAgICB7IGNvZGU6ICdXQScsIG5hbWU6ICdXYXNoaW5ndG9uJyB9LFxyXG4gICAgeyBjb2RlOiAnV1YnLCBuYW1lOiAnV2VzdCBWaXJnaW5pYScgfSxcclxuICAgIHsgY29kZTogJ1dJJywgbmFtZTogJ1dpc2NvbnNpbicgfSxcclxuICAgIHsgY29kZTogJ1dZJywgbmFtZTogJ1d5b21pbmcnIH1cclxuXTtcclxuIl19
