var app = app || {};

app.course = app.CourseMapperModel.extend({
	urlRoot: function() {
    
 			return this.serverUrl+"/course_mapping_tool/manager/index.php/courses";
	},
	defaults: {
		name: "e.g. Introduction to Mandarin",
		code: "e.g. MAN101",
		duration: 13,
		course_id: 0,
	},
	validate: function(attrs, options) {
		var invalidFields = [];
		if(_.has(attrs,"name") && attrs.name.length > 255) {
			invalidFields.push({field: "name", message: "Name cannot be longer than 255 characters."});
		}
		if(_.has(attrs,"code") && attrs.code.length > 12) {
			invalidFields.push({field: "code", message: "Code cannot be longer than 12 characters."});
		}
		if(_.has(attrs,"duration") && isNaN(attrs.duration)) {
			var msg = "Duration must be a number between 1 and 127.";
			if(isNaN(attrs.duration)) {
				invalidFields.push({field: "duration", message: msg});
			} else if(attrs.duration < 1 || attrs.duration > 127) {
				invalidFields.push({field: "duration", message: msg});
			}
		}
		
		if(invalidFields.length === 0) return;
		
		return invalidFields;
	},
		initialize: function() {
	},
	
});
