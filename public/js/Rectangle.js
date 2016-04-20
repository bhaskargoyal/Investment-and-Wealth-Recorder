var Rectangle = function(x, y, w, h) {
	if(x == null || y == null || w == null || h == null) {
		var errMsg = "The following values for rectangle must be specified:";
		if(x == null)
			errMsg += " 'x' ";
		if(y == null)
			errMsg += " 'y' ";
		if(w == null)
			errMsg += " 'w' ";
		if(h == null)
			errMsg += " 'h' ";
		throw new Error(errMsg);
	}
	this.x = x;
	this.y = y;
	this.width = w;
	this.height = h;

	this.Contains = function(x, y) {
		if(x >= this.x && x <= this.x + this.width && y >= this.y && y <= this.y + this.width) {
			return true;
		} else {
			return false;
		}
	}

	this.Draw = function(ctx, color) {
		ctx.fillStyle = color;
		ctx.fillRect(this.x, this.y, this.width, this.height);
	}

	this.Intersects = function(shape) {
		var offset =0;
		if(shape.radius != null){
			offset = shape.radius;
		}

		if(shape.Contains(this.x - offset, this.y - offset) || shape.Contains(this.x + this.width - offset, this.y - offset) || shape.Contains(this.x - offset, this.y + this.height - offset) || shape.Contains(this.x + this.width - offset, this.y + this.height - offset)) {
			return true;
		}
		if(this.Contains(shape.x - offset, shape.y - offset) || this.Contains(shape.x + shape.width - offset, shape.y - offset) || this.Contains(shape.x - offset, shape.y + shape.height - offset) || this.Contains(shape.x + shape.width - offset, shape.y + shape.height - offset)) {
			return true;
		}
		return false;
	}
};	