var app = app || {};

app.learningActivitiesTable = Backbone.View.extend({
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
					var id = $(e.target).data("id");
					var learningActivity = this.collection.remove(id);
					learningActivity.destroy();
			}
		}
	},
	extra: {
		allLearningOutcomes : [],
	},
	createSuccess: function(learningOutcomes) {
    		this.extra = { allLearningOutcomes : learningOutcomes };
    		this.collection.each(this.addLearningActivity, this);	
    },
	render: function() {
		//var me = this;
		this.$el.html("");

		var learningOutcomes = new app.learningOutcomes({ model : app.learningOutcome }, {course_id: this.collection.course_id});
    	learningOutcomes.fetch({data: { page:1, limit: 100 }, success: this.createSuccess });	
    	
    	return this;
	},
	addLearningActivity: function(learningActivity) {
		learningActivity.extra = this.extra;

    	var learningActivityRow = new app.learningActivityRow({ model: learningActivity });
    	this.$el.append(learningActivityRow.render().el);
    	
    	$("select").chosen();
	}
});


