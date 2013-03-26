/**
 * Initializes a visual context.
 * 
 * @name pvc.visual.Context
 * 
 * @class Represents a visualization context.  
 * The visualization context gives access to all relevant information
 * for rendering or interacting with a visualization.
 * <p>
 * A visualization context object <i>may</i> be reused
 * across extension points invocations and actions.
 * </p>
 * 
 * @property {pvc.BaseChart} chart The chart instance.
 * @property {pvc.BasePanel} panel The panel instance.
 * @property {number} index The render index.
 * @property {pvc.visual.Scene} scene The render scene.
 * @property {object} event An event object, present when a click or double-click action is being processed.
 * @property {pv.Mark} pvMark The protovis mark.
 * 
 * @constructor
 * @param {pvc.BasePanel} panel The panel instance.
 * @param {pv.Mark} mark The protovis mark.
 * @param {object} [event] An event object.
 */
def.type('pvc.visual.Context')
.init(function(panel, mark, event){
    this.chart = panel.chart;
    this.panel = panel;
    
    visualContext_update.call(this, mark, event);
})
.add(/** @lends pvc.visual.Context */{
    isPinned: false,
    
    pin: function(){
        this.isPinned = true;
        return this;
    },
    
    finished: function(v){
        /*jshint sub:true */
        return this.sign.finished(v);
    },
    
    delegate: function(dv){
        return this.sign.delegate(dv);
    },
    
    /* V1 DIMENSION ACCESSORS */
    getV1Series: function(){
        var s;
        var series = this.scene.firstAtoms && (s = this.scene.firstAtoms[this.panel._getV1DimName('series')]) && s.rawValue;
        if(series == null){
            series = 'Series';
        }
        
        return series;
    },
    
    getV1Category: function(){
        var c;
        return this.scene.firstAtoms && (c = this.scene.firstAtoms[this.panel._getV1DimName('category')]) && c.rawValue;
    },
               
    getV1Value: function(){
        var v;
        return this.scene.firstAtoms && (v = this.scene.firstAtoms[this.panel._getV1DimName('value')]) && v.value;
    },
    
    getV1Datum: function(){
        return this.panel._getV1Datum(this.scene);
    }
});

if(Object.defineProperty){
    try{
        Object.defineProperty(pvc.visual.Context.prototype, 'parent', {
            get: function(){
                throw def.error.operationInvalid("The 'this.parent.index' idiom has no equivalent in this version. Please try 'this.pvMark.parent.index'.");
            }
        });
    } catch(ex) {
        /* IE THROWS */
    }
}

/**
 * Used internally to update a visual context.
 * 
 * @name pvc.visual.Context#_update
 * @function
 * @param {pv.Mark} mark The protovis mark being rendered or targeted by an event.
 * @param {object} [event] An event object.
 * @type undefined
 * @private
 * @virtual
 * @internal
 */
function visualContext_update(mark, event){

    this.event  = event || null;
    this.pvMark = mark;
    
    var scene;
    if(mark){
        var sign = this.sign = mark.sign || null;
        if(sign){
            scene = mark.instance().data;
        }
        
        if(!scene){
            this.index = null;
            scene = new pvc.visual.Scene(null, {panel: this.panel});
        } else {
            this.index = scene.childIndex();
        }
    } else {
        this.sign  = null;
        this.index = null;
        
        scene = new pvc.visual.Scene(null, {
            panel: this.panel,
            group: this.chart.root.data
        });
    }
    
    this.scene = scene;
}