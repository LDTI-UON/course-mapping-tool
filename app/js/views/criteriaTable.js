var app = app || {};

app.criteriaTable = Backbone.View.extend({
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
					var criterion = this.collection.remove(id);
					criterion.destroy();
			}
		}
	},
	render: function() {
		this.$el.html("");
		this.collection.each(this.addCriterion, this);	
    	
    	return this;
	},
	addCriterion: function(criterion) {
    	var criterionRow = new app.criterionRow({ model: criterion });
    	this.$el.append(criterionRow.render().el);
	}
});


