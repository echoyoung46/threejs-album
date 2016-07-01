function Animation(_role) {
    this.role = _role;

    this.end = function(){
        this.role.rotation = null;
    }
}

Animation.prototype.rotate = function(_direction, _speed) {
    var direction = _direction || 'x',
        speed = _speed || 0.01;
        switch( direction ){
            case 'x':
                this.role.rotation.x += speed;
                break;
            case 'y':
                this.role.rotation.y += speed;
                break;
            case 'z':
                this.role.rotation.z += speed;
                break;
            default:
                break;
        }
    
}

Animation.prototype.translate = function(_direction, _speed) {
    var direction = _direction || 'x',
        speed = _speed || 0.01;

        switch( direction ){
            case 'x':
                this.role.position.x += speed;
                // console.log(this.role.position.x);
                break;
            case 'y':
                this.role.position.y += speed;
                break;
            case 'z':
                this.role.position.z += speed;
                break;
            default:
                break;
        }
    
}

Animation.prototype.lineUp = function(_obj) {

    var roleChildren = this.role.children;
    for( var i = 0; i < roleChildren.length; i++ ) {

        var _children = roleChildren[i];
        for( var j in _obj ){
            var speed = _obj[j] ;

            switch( j ){
                case 'x':
                    _children.position.x += speed * (i + 1);
                    break;
                case 'y':
                    _children.position.y += speed * (i + 1);
                    break;
                case 'z':
                    if( _children.position.z > -500 ){
                        _children.position.z += speed * (i + 1);
                    }
                    break;
                default:
                    break;
            }
        }

    }
}

// Animation.translatetotype.wagTail = function() {

// }