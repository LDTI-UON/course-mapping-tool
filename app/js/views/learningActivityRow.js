var app = app || {};

app.learningActivityRow = CourseMapperView.extend({
	tagName: "tr",
	template: _.template( $("#learningActivityRow").html() )	,
	events: {
		"change" : function(e) {
			
			switch(e.target.id) {
				case "name":
				case "details":
				case "type":
				case "week":
				case "learning_outcomes":
					this.validationCheck(e.target.id, e.target);
			}
		},
	},
	render: function() {
		var lo_options = this.buildLearningOutcomeOptions();
		
		var _options = ["in class", "out of class"];
		var type = this.model.get("type").toLowerCase();
		
		var type_options = this.buildPredefOptions(_options, type);
		
		var copy = this.model.toJSON();
		copy.learning_outcomes = lo_options;
		copy.type = type_options;
		
		var learningActivityRow = this.template(copy);
		this.$el.html(learningActivityRow);
		$("select").chosen(); // noice selects	

		return this;
	}
});