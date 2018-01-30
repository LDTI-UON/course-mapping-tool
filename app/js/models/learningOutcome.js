var app = app || {};

app.learningOutcome = app.CourseMapperModel.extend({
	urlRoot: function() {
		var course_id = this.get("course_id");
		return this.serverUrl+"/course_mapping_tool/manager/index.php/courses/"+course_id+"/learning_outcomes";
	},
	defaults: {
		name: "Learning Outcome ",
		details: "e.g. Students can demonstrate how to use a verb in Mandarin",
		course_id: 0,
		extra: [],
		myIndex: 0,
	},
	validate: function(attrs, options) {
		var invalidFields = [];

		if(_.has(attrs,"name") && attrs.name.length > 255) {
			invalidFields.push({field: "name", message: "Name cannot be longer than 255 characters."});
		}
		if(_.has(attrs,"details") && attrs.details.length > 5000) {
			invalidFields.push({field: "details", message: "Details cannot be longer than 5000 characters."});
		}
		
		if(invalidFields.length === 0) return;
		
		return invalidFields;
	},
	initialize: function(param) {
		this.course_id = param.course_id;
	},
	
});
