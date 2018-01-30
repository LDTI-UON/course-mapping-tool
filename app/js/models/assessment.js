var app = app || {};

app.assessment = app.CourseMapperModel.extend({
	urlRoot: function() { 
		return this.serverUrl+"/course_mapping_tool/manager/index.php/courses/"+this.course_id+"/assessments";
	},
	defaults: {
		name: "e.g. Verbal test",
		details: "e.g. Students conduct a conversation with an assessor for 15 minutes",
		type: "formative",
		week: 1,
		weight: 0.1,
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
		if(_.has(attrs,"week")) {
			var msg = "Week must be a number between 1 and 127.";
			
			if(attrs.week != "ongoing") {
				if(isNaN(attrs.week)) {
					var a = attrs.week.split("_");
					var week1 = typeof a[0] == 'undefined' ? 0 : a[0];
					var week2 = typeof a[1] == 'undefined' ? 0 : a[1];
					
					if(isNaN(week1) || isNaN(week2)) {
						invalidFields.push({field: "week", message: msg});
					}
					
					if(week2 < week1) {
						invalidFields.push({field: "week", message: "End week must be after start week."});
					}
					
				} else if(attrs.week < 1 || attrs.week > 127) {
					invalidFields.push({field: "week", message: msg});
				}
			}
		}
		if(_.has(attrs,"weight")) {
			var msg = "Weight must be a number between 1 and 100.";
			if(isNaN(attrs.weight)) {
				invalidFields.push({field: "weight", message: msg });
			} else if(attrs.weight < 0 || attrs.weight > 1) { // fraction of 1
				invalidFields.push({field: "weight", message: msg });
			}
		}
		
		if(invalidFields.length === 0) return;
		
		return invalidFields;
	},
	initialize: function(param) {
		this.course_id = param.course_id;
	},
	
});
