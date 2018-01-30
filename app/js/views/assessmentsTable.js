var app = app || {};

app.assessmentsTable = CourseMapperView.extend({
	tagName: "tbody",
	initialize: function() {
		_.bindAll(this, "createSuccess");
		
		this.listenTo(this.collection, "remove", this.render);
		this.listenTo(this.collection, "add", this.render);
	}, 
	events: {
		"mousedown" : function(e) {
			var mymodel = this.model;
		
			switch(e.target.id) {
				case "delete":
					var header = "<strong class='text-warning'>Warning! Delete assessment forever?</strong>";
					var message = "This will also delete any rubrics associated with this assessment.";
					
					this.setDeleteAction(function() {
						var id = $(e.target).data("id");
						var assessment = this.collection.remove(id);
						assessment.destroy();
					});
					
					this.deleteDialog(header, message);
			}
		},
        "change" : function(e) {
             switch(e.target.id) {
                 case "weight":

                 var total = 0;

                 this.collection.each(function(v, i) {
                        total += parseFloat(v.get("weight"));
                 });

                 if(total > 1.0) {
                    var total_str = (total * 100).toFixed();

                    this.genericDialog("<strong class='text-danger'>Weightings greater than 100%</strong>", "Your assessment weightings are "+total_str+"%. Please lower some weightings.");
                 }
             }
        }
	},
	extra: {
		allLearningOutcomes : [],
	},
	createSuccess: function(learningOutcomes) {
    		this.extra = { allLearningOutcomes : learningOutcomes };
    		this.collection.each(this.addAssessment, this);
    },
	render: function() {
    	this.$el.html("");
    	
    	var learningOutcomes = new app.learningOutcomes({ model : app.learningOutcome }, {course_id: this.collection.course_id});
    	learningOutcomes.fetch({data: { page:1, limit: 100 }, success: this.createSuccess });	

    	return this;
	},
	addAssessment: function(assessment) {
		assessment.extra = this.extra;

    	var assessmentRow = new app.assessmentRow({ model: assessment });
    	this.$el.append(assessmentRow.render().el);
    	$("select").chosen();
	}
});


