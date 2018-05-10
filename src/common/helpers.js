export function arrToMap(arr, key) {
    return arr.reduce((acc, item) => {
        acc[item[key]] = item
        return acc
    }, {})
}

export function mapToArr(obj) {
    return Object.keys(obj).map(id => obj[id])
}


export function get(o, p) {
	if (typeof p == "string") {
	    p = p.split('.')
	    var obj= o[p.shift()];
	    while(obj && p.length) obj = obj[p.shift()];
	    return obj;		
	}
    return p.reduce(function(xs, x) {
    	return ((xs && xs[x]) ? xs[x] : null)
    }, o)
}
