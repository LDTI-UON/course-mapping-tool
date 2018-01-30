var app = app || {};

app.learningOutcomesTable = Backbone.View.extend({
	tagName: "tbody",
	initialize: function() {
		this.listenTo(this.collection, "remove", this.render);
		this.listenTo(this.collection, "add", this.render);
	}, 
	events: {
		"mousedown" : function(e) {
			var mymodel = this.model;
		
			switch(e.target.id) {
				case "delete":
					var id = $(e.target).data("id");
					var learningOutcome = this.collection.remove(id);
					learningOutcome.destroy();
			}
		}
	},
	render: function() {
    	this.$el.html("");
    	this.collection.each(this.addLearningOutcome, this);
    	return this;
	},
	addLearningOutcome: function(learningOutcome) {
		var name = learningOutcome.get("name");
		
		var index = this.collection.indexOf(learningOutcome);
		
		if(name == "Learning Outcome ") {
			name = name + (index + 1).toString();
			//learningOutcome.set("name", name);	
			learningOutcome.set("name", name);
			learningOutcome.save();
		}
		
    	var learningOutcomeRow = new app.learningOutcomeRow({ model: learningOutcome });
    	this.$el.append(learningOutcomeRow.render().el);
    	learningOutcomeRow.delegateEvents();
	}
});


