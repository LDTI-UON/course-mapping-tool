var app = app || {};

app.criterion = app.CourseMapperModel.extend({
	urlRoot: function() { 
		return this.serverUrl+"/course_mapping_tool/manager/index.php/assessments/"+this.assessment_id+"/criteria";
	},
	defaults: {
		description: "Student demonstrates understanding of ... ",
		col1: "Showed no understanding of...",
		col2: "Demonstrated a basic understanding of...",
		col3: "Demonstrated a competent understanding of...",
		col4: "Demonstrated a thorough understanding of ...",
		col5: "Demonstrated exceptional understanding of...	",
		assessment_id: 0,
	},
	validate: function(attrs, options) {
		var rawmsg = "This descriptor cannot be longer than %n characters.";
		
		var invalidFields = [];
		if(_.has(attrs,"description") && attrs.description.length > 1000) {
			msg = rawmsg.replace("%n", "1000");
			invalidFields.push({field: "description", message: msg});
		}
		
		msg = rawmsg.replace("%n", "500");
		
		if(_.has(attrs,"col1") && attrs.col1.length > 500) {
			invalidFields.push({field: "col1", message: msg});
		}
		if(_.has(attrs,"col2") && attrs.col2.length > 500) {
			invalidFields.push({field: "col2", message: msg});
		}
		if(_.has(attrs,"col3") && attrs.col2.length > 500) {
			invalidFields.push({field: "col3", message: msg});
		}
		if(_.has(attrs,"col4") && attrs.col2.length > 500) {
			invalidFields.push({field: "col4", message: msg});
		}
		if(_.has(attrs,"col5") && attrs.col2.length > 500) {
			invalidFields.push({field: "col5", message: msg});
		}
		
		if(invalidFields.length === 0) return;
		
		return invalidFields;
	},
	initialize: function(param) {
		this.assessment_id = param.assessment_id;
	},
	
});
