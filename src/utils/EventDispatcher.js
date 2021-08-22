import mergeDeep from './mergeDeep'

export default function EventDispatcher(){
    // Create a DOM EventTarget object
    var target = document.createTextNode('')

    function addRemove(op, events, cb){
        if( cb )
            events.split(/\s+/g).forEach(name => target[op + 'EventListener'].call(target, name, cb))
    }

    // Pass EventTarget interface calls to DOM EventTarget object
    return {
        off(events, cb){
            addRemove('remove', events, cb)
            return this
        },

        on(events, cb){
            if(cb && typeof cb == 'function')
                addRemove('add', events, cb)
            return this
        },

        trigger(eventName, data, opts){
            var e;

            opts = opts || {
                cloneData:true
            }

            if( !eventName ) return;

            else{
                try {
                    var eventData = typeof data === 'object'
                        ? data
                        : {value:data};

                    eventData = opts.cloneData ? mergeDeep({}, eventData) : eventData
                    eventData.knobs = this

                    // TODO: move the below to the "mergeDeep" function
                    if( data instanceof Object )
                        for( var prop in data )
                            if(data[prop] instanceof HTMLElement)
                                eventData[prop] = data[prop]

                    e = new CustomEvent(eventName, {"detail":eventData})
                }
                catch(err){ console.warn(err) }

                target.dispatchEvent(e);
            }
        }
    }
}
