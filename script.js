

AFRAME.registerComponent('ball-reset', {
    schema: {
      color: {default: 'red'}
    },

    init: function () {
      var data = this.data;
      var el = this.el;  // <a-box>
      var defaultColor = el.getAttribute('material').color;

      el.addEventListener('mouseenter', function () {
        el.setAttribute('color', data.color);
      });

      el.addEventListener('mouseleave', function () {
        el.setAttribute('color', defaultColor);
      });
      
      el.addEventListener('click', function (){
        console.log("click");
        el.setAttribute('position', "0 3 -11");
      });
    }
  });
  
  AFRAME.registerComponent('autodestroy', {
    schema: {
        delay: {type: 'number', default: 5000},
    },

    init() {
        this.destroy = this.destroy.bind(this);
        setTimeout(this.destroy, this.data.delay);
    },

    destroy(){
        this.el.parentEl.removeChild(this.el);
    },



});

AFRAME.registerComponent('typewriter', {
    schema: {
        interval: {type: 'number', default: 50},
        waitTime: {type: 'number', default: 0},
        value: {type: 'string', default: ''},
    },

    init() {
        this.writeValue = this.writeValue.bind(this);
        this.start = this.start.bind(this);
        this.update();
    },

    update(){
        this.el.setAttribute('visible', 'false');
        this.writingIndex = 1;
        this.value = this.data.value;
        setTimeout(this.start, this.data.waitTime);
    },

    start(){
        this.el.setAttribute('visible', 'true');
        this.stop();
        this.intervalID = setInterval(this.writeValue, this.data.interval);
        this.showValue("................................................................................................................................................................................................................................................................................................");
    },

    remove(){
        this.stop();
    },

    stop(){
        clearInterval(this.intervalID);
    },

    writeValue(){
        const content = this.value.substring(0, this.writingIndex);
        this.showValue(content);
        this.writingIndex++;
        if(this.writingIndex >= this.value.length){
            this.stop();
        }
    },

    showValue(value){
        this.el.setAttribute('text', `value:${value};baseline: top;lineHeight: 50;wrapCount: 27.54;`);
    }

});