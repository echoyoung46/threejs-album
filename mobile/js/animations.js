function Animation(_role) {
    this.role = _role;
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

Animation.prototype.moveByPath = function() {

}