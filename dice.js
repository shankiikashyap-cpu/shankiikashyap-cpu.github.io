// --- 3D HIGH-RES DICE WITH TURN-MATCHED DOTS & AUDIO SYNC ---
class LudoDice {
    constructor(scene, onRollComplete) {
        this.scene = scene;
        this.onRollComplete = onRollComplete;
        this.isRolling = false;
        this.currentValue = 1;

        // Audio setup with preloading
        this.rollAudio = new Audio();
        this.rollAudio.src = 'dice.mp3';
        this.rollAudio.preload = 'auto';

        // Unlock audio on initial user interaction for mobile/desktop browsers
        const unlockAudio = () => {
            this.rollAudio.play().then(() => {
                this.rollAudio.pause();
                this.rollAudio.currentTime = 0;
            }).catch(() => {});
            window.removeEventListener('pointerdown', unlockAudio);
            window.removeEventListener('click', unlockAudio);
        };
        window.addEventListener('pointerdown', unlockAudio);
        window.addEventListener('click', unlockAudio);

        this.spots = {
            RED:    [-6.8, 0.75, -4.5],
            GREEN:  [ 6.8, 0.75, -4.5],
            YELLOW: [ 6.8, 0.75,  4.5],
            BLUE:   [-6.8, 0.75,  4.5]
        };

        this.dotColors = {
            RED:    '#ef4444',
            GREEN:  '#10b981',
            YELLOW: '#d97706',
            BLUE:   '#2563eb'
        };

        this.currentTeam = "RED";

        this.faceRotations = {
            2: { x: 0,            y: 0, z: 0 },
            5: { x: Math.PI,       y: 0, z: 0 },
            1: { x: 0,            y: 0, z: Math.PI / 2 },
            6: { x: 0,            y: 0, z: -Math.PI / 2 },
            3: { x: -Math.PI / 2, y: 0, z: 0 },
            4: { x: Math.PI / 2,  y: 0, z: 0 }
        };

        this.mesh = this.buildMesh();
        this.mesh.position.set(...this.spots.RED);
        this.scene.add(this.mesh);
    }

    makeTexture(dots, dotColor) {
        const canvas = document.createElement('canvas');
        canvas.width = 256;
        canvas.height = 256;
        const ctx = canvas.getContext('2d');

        // Rounded smooth face frame
        ctx.fillStyle = '#0f172a';
        ctx.fillRect(0, 0, 256, 256);

        // Ivory white inner die surface
        ctx.fillStyle = '#ffffff';
        if (ctx.roundRect) {
            ctx.beginPath();
            ctx.roundRect(10, 10, 236, 236, 36);
            ctx.fill();
        } else {
            ctx.fillRect(10, 10, 236, 236);
        }

        // Inner shadow edge
        ctx.strokeStyle = '#e2e8f0';
        ctx.lineWidth = 12;
        if (ctx.roundRect) {
            ctx.beginPath();
            ctx.roundRect(16, 16, 224, 224, 28);
            ctx.stroke();
        }

        // Dynamic colored dots
        ctx.fillStyle = dotColor || '#ef4444';
        const d = (x, y) => {
            ctx.beginPath();
            ctx.arc(x, y, 22, 0, Math.PI * 2);
            ctx.fill();
        };

        if (dots === 1) d(128, 128);
        if (dots === 2) { d(72, 72); d(184, 184); }
        if (dots === 3) { d(72, 72); d(128, 128); d(184, 184); }
        if (dots === 4) { d(72, 72); d(184, 72); d(72, 184); d(184, 184); }
        if (dots === 5) { d(72, 72); d(184, 72); d(128, 128); d(72, 184); d(184, 184); }
        if (dots === 6) { d(72, 72); d(184, 72); d(72, 128); d(184, 128); d(72, 184); d(184, 184); }

        return new THREE.CanvasTexture(canvas);
    }

    getMaterials(team) {
        const color = this.dotColors[team] || '#ef4444';
        return [
            new THREE.MeshStandardMaterial({ map: this.makeTexture(1, color), roughness: 0.15, metalness: 0.1 }),
            new THREE.MeshStandardMaterial({ map: this.makeTexture(6, color), roughness: 0.15, metalness: 0.1 }),
            new THREE.MeshStandardMaterial({ map: this.makeTexture(2, color), roughness: 0.15, metalness: 0.1 }),
            new THREE.MeshStandardMaterial({ map: this.makeTexture(5, color), roughness: 0.15, metalness: 0.1 }),
            new THREE.MeshStandardMaterial({ map: this.makeTexture(3, color), roughness: 0.15, metalness: 0.1 }),
            new THREE.MeshStandardMaterial({ map: this.makeTexture(4, color), roughness: 0.15, metalness: 0.1 })
        ];
    }

    buildMesh() {
        const geom = new THREE.BoxGeometry(1.24, 1.24, 1.24);
        const mesh = new THREE.Mesh(geom, this.getMaterials(this.currentTeam));
        mesh.castShadow = true;
        return mesh;
    }

    updateDiceDotColor(team) {
        this.mesh.material = this.getMaterials(team);
    }

    moveToTeam(team) {
        this.currentTeam = team;
        this.updateDiceDotColor(team);

        const target = this.spots[team];
        new TWEEN.Tween(this.mesh.position)
            .to({ x: target[0], y: target[1], z: target[2] }, 260)
            .easing(TWEEN.Easing.Quadratic.Out)
            .start();
    }

    roll(team) {
        if (this.isRolling) return;
        this.isRolling = true;
        this.currentTeam = team || this.currentTeam;
        this.updateDiceDotColor(this.currentTeam);

        // Audio trigger
        try {
            this.rollAudio.currentTime = 0;
            const playPromise = this.rollAudio.play();
            if (playPromise !== undefined) {
                playPromise.catch(err => {
                    console.warn("Audio play notice:", err);
                });
            }
        } catch (e) {
            console.error("Audio error:", e);
        }

        this.currentValue = Math.floor(Math.random() * 6) + 1;
        const targetRot = this.faceRotations[this.currentValue];
        const spot = this.spots[this.currentTeam];

        this.mesh.rotation.x = this.mesh.rotation.x % (Math.PI * 2);
        this.mesh.rotation.y = this.mesh.rotation.y % (Math.PI * 2);
        this.mesh.rotation.z = this.mesh.rotation.z % (Math.PI * 2);

        // Spin matched to 1.1s audio length (1050ms)
        new TWEEN.Tween(this.mesh.rotation)
            .to({
                x: targetRot.x + (Math.PI * 6),
                y: targetRot.y + (Math.PI * 6),
                z: targetRot.z + (Math.PI * 4)
            }, 1050)
            .easing(TWEEN.Easing.Cubic.Out)
            .start();

        // 550ms jump up + 500ms bounce drop = 1050ms total timing sync
        new TWEEN.Tween(this.mesh.position)
            .to({ y: 3.6 }, 550)
            .easing(TWEEN.Easing.Quadratic.Out)
            .chain(
                new TWEEN.Tween(this.mesh.position)
                    .to({ y: spot[1] }, 500)
                    .easing(TWEEN.Easing.Bounce.Out)
                    .onComplete(() => {
                        this.isRolling = false;
                        if (this.onRollComplete) {
                            this.onRollComplete(this.currentValue);
                        }
                    })
            )
            .start();
    }
}