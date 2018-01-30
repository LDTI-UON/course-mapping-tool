var app = app || {};

app.learningActivity = app.CourseMapperModel.extend({
	urlRoot: function() { 
			return this.serverUrl+"/course_mapping_tool/manager/index.php/courses/"+this.course_id+"/learning_activities";
	},
	defaults: {
		name: "e.g. Conduct a conversation",
		details: "e.g. Students conduct a conversation with a native speaker of Mandarin",
		type: "in class",
		week: 1,
		course_id: 0,
		learning_outcomes: [],
		extra: [],
	},
	validate: function(attrs, options) {
		var invalidFields = [];

		if(_.has(attrs,"name") && attrs.name.length > 255) {
			invalidFields.push({field: "name", message: "Name cannot be longer than 255 characters."});
		}
		if(_.has(attrs,"details") && attrs.details.length > 5000) {
			invalidFields.push({field: "details", message: "Details cannot be longer than 5000 characters."});
		}
		
		if(_.has(attrs,"week") && isNaN(attrs.week)) {
			invalidFields.push({field: "week", message: "Week must be a number between 1 and 255."});
		}
		
		if(invalidFields.length === 0) return;
		
		return invalidFields;
	},
	initialize: function(param) {
		this.course_id = param.course_id;
	},
	
});
