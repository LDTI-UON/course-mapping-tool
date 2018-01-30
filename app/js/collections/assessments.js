var app = app || {};

app.assessments = app.CourseMapperCollection.extend({
	url: function() {
		var course_id = this.course_id;
		return this.serverUrl+"/course_mapping_tool/manager/index.php/courses/"+course_id+"/assessments";
	},
	model: app.assessment,
	initialize: function(_obj, options) {
		_.bindAll(this, "byLearningOutcomeId")
		if(typeof options !== 'undefined') {
			this.course_id = options.course_id;
		} else {
			this.course_id = parseInt(_obj.model.get("course_id"));
		}
	},
	byLearningOutcomeId: function (learning_outcome_id) {
	        filtered = this.filter(function (assessment) {
	        	var arr = JSON.parse(assessment.get("learning_outcomes"));
				return arr.indexOf(learning_outcome_id) !== -1;
	        });
	        
	     //   filtered.course_id = "placeholder";
	        
	        return new app.assessments(filtered, { course_id: this.course_id });
	}
});