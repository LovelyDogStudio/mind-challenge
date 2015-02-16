export class WinDialog extends Phaser.Group {
    constructor(game, {
        dialogService: dialogService
    } = {}, dialogText = "") {
        super(game, dialogService, "WinDialog");

        // Add background group
        this.background = new Phaser.Group(this.game, this, "background");
        this.explosion1 = this.background.add(new Phaser.Sprite(game, 0, -30, 'explosion1', 0));
        this.explosion2 = this.background.add(new Phaser.Sprite(game, 0, 0, 'explosion2', 0));
        this.explosion3 = this.background.add(new Phaser.Sprite(game, 0, 0, 'explosion3', 0));
        this.explosion4 = this.background.add(new Phaser.Sprite(game, 0, 0, 'explosion4', 0));

        this.explosion1.anchor.x = .5;
        this.explosion1.anchor.y = .5;
        this.explosion3.anchor.x = .5;
        this.explosion3.anchor.y = .5;
        this.explosion2.anchor.x = .5;
        this.explosion2.anchor.y = .5;
        this.explosion4.anchor.x = .5;
        this.explosion4.anchor.y = .5;

        this.sparkle;
        this.sparkles = new Phaser.Group(this.game, this, "sparkles");
        for (let i = 0; i<50; i++) {
            let posX = this.game.rnd.integerInRange(-920/2, 920/2);
            let posY = this.game.rnd.integerInRange(-920/2, 920/2);
            let scale = this.game.rnd.realInRange(0.3, 1);
            let delay = this.game.rnd.realInRange(0, 0.1)*Phaser.Timer.SECOND;
            this.sparkle = this.sparkles.add(new Phaser.Sprite(game, posX, posY, 'sparkle', 0));
            this.sparkle.scale.setTo(scale, scale);
            this.sparkle.alpha = 1;
        }


        // Add labels
        this.dialogContent = new Phaser.Group(this.game, this, "dialogContent");
        this.titleLabel = this.dialogContent.add(new Phaser.Sprite(game, 0, -50, dialogText, 0));
        this.textLabel = this.game.add.text(0, 80, "", {
            font: "110px Roboto-Black",
            fill: "#34004f",
            align: "center"
        }, this.dialogContent);
        this.textLabel.stroke = "#fff";
        this.textLabel.strokeThickness = 6;
        this.textLabel.setShadow(0, 0, '#ff66ff', 15);

        this.titleLabel.anchor.x = .5;
        this.titleLabel.anchor.y = .5;
        this.textLabel.anchor.x = .5;
        this.textLabel.anchor.y = .5;


        this.closing = false;
        this.alpha = 0;
        this.x = game.world.centerX;
        this.y = game.camera.height / 2;
    }

    prompt({
        amount: amount = 0
    }) {
        return new Promise((resolve, reject) => {
            this.textLabel.setText(amount);
            this.onClose = resolve;

            //Rotate the lights
            this.game.add.tween(this.explosion3)
        		.to({
            		angle: 360,
        		}, 80*Phaser.Timer.SECOND, Phaser.Easing.Linear.None, true, 0, 100);
            this.game.add.tween(this.explosion1)
        		.to({
            		angle: 360,
        		}, 50*Phaser.Timer.SECOND, Phaser.Easing.Linear.None, true, 0, 100);
        	this.game.add.tween(this.explosion2)
        		.to({
            		angle: 360,
        		}, 60*Phaser.Timer.SECOND, Phaser.Easing.Linear.None, true, 0, 100);


            //Scale everything
            this.game.add.tween(this.scale)
            	.from({
            		x: 0,
            		y: 0
            	}, 0.5*Phaser.Timer.SECOND, Phaser.Easing.Back.Out, true);

        	//Alpha everything
            this.game.add.tween(this)
                .to({
                    alpha: 1
                }, 0.2*Phaser.Timer.SECOND, Phaser.Easing.Quadratic.In, true)
                .onComplete.add(() => {
                    this.game.time.events.add(1500, this.close, this);
                }, this);
        });
    }

    close() {
        if (this.closing) return;
        this.closing = true;
        this.game.add.tween(this)
            .to({
                alpha: 0
            }, 600, Phaser.Easing.Quadratic.In, true)
            .onComplete.add(() => {
                this.closing = false;
                if (this.onClose) {
                    this.onClose();
                    this.onClose = undefined;
                }
            }, this);
    }
}
