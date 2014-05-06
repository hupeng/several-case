function Snake(container){
	this.count = 0; //吃掉的数目
	this.time = 0;  // 游戏用时
	this.status = 1; // 游戏状态：0--暂停， 1--开始
	this.direct = 2;  // 运动方向： 1--left， 2--right， 3--up， 4--down
	this.target = new Point(340,300);
	this.body = [new Point(60,20), new Point(40,20), new Point(20,20)];
	this.container = container || null;
}

Snake.prototype = {
	constructor: Snake,

	createTarget: function(){
		var x,  y;
		while(1){
			x = Math.round(Math.random()*680);
			x = x - x % 20;

			y = Math.round(Math.random() * 580);
			y = y - y % 20;

			var isClash = false; // true--与蛇身冲突， false--与蛇身不冲突
			var i = 0;
			for( i in this.body){
				if( x == this.body[i].x && y == this.body[i].y){
					isClash = true;
					break;
				}
			}
			if(!isClash){
				break;
			}
		};

		this.target = new Point(x, y);
	},

	clearTarget: function(point){
		var canvas2D = this.container.getContext('2d');
		if(typeof point == 'undefined'){
			canvas2D.clearRect(this.target.x, this.target.y, 20, 20);
		} else{
			canvas2D.clearRect(point.x, point.y, 20, 20);
		}
		
	},

	updateSnake: function(){
		var canvas2D = this.container.getContext('2d');
		canvas2D.beginPath();
		canvas2D.fillStyle = 'red';
		canvas2D.fillRect(this.target.x, this.target.y, 20, 20);

		canvas2D.fillStyle = 'blue';
		var i = 0;
		for(i in this.body){
			canvas2D.fillRect(this.body[i].x, this.body[i].y, 20, 20);
		}
	},

	move: function(){
		var header = new Point();
		header.x = this.body[0].x;
		header.y = this.body[0].y;

		var footer = new Point();
		footer.x = this.body[this.count + 2].x;
		footer.y = this.body[this.count + 2].y;

		switch(this.direct){
			case 1: 
				header.x -= 20;
				if(header.x < 0){
					this.status = 0;
				}
				break;
			case 2: 
				header.x += 20
				if(header.x > 680){
					this.status = 0;
				}
				break;
			case 3:
				header.y -= 20;
				if(header.y < 0){
					this.status = 0;
				}
				break;
			case 4:
				header.y += 20;
				if(header.y > 580){
					this.status = 0;
				}
		}

		//判断是否碰到自己
		if(this.status == 1){
			for(var i = 0; i < (this.count + 3); i++){
				if(header.x == this.body[i].x && header.y == this.body[i].y){
					this.status = 0;
					break;
				}
			}
		}

		if(this.status == 1){ // 判断是否吃到东西
			if(header.x == this.target.x && header.y == this.target.y){
				this.count++;
				this.body[this.count + 2] = new Point();
				this.body[this.count + 2].x = footer.x;
				this.body[this.count + 2].y = footer.y;
				this.clearTarget();
				this.createTarget();
			}


			//console.log(this.body[Snake.count + 2]);
			this.clearTarget(this.body[this.count + 2]);
			for(var i = this.count + 2; i > 0; i--){
				this.body[i].x = this.body[i-1].x;
				this.body[i].y = this.body[i-1].y;
			}
			this.body[0].x = header.x;
			this.body[0].y = header.y;
		}		
	},

	initSnake: function(){
		this.count = 0;
		this.time = 0;
		this.status = 1;
		this.target = new Point(340,300);
		this.body = [new Point(60,20), new Point(40,20), new Point(20,20)];

	}
}



function Point(x, y){
	this.x = x || '';
	this.y = y || '';
}