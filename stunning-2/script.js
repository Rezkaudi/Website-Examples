/* ══════════════════════════════════════════
   PRELOADER
   ══════════════════════════════════════════ */
(function () {
    const fill = document.getElementById('preloader-fill');
    const percent = document.getElementById('preloader-percent');
    const preloader = document.getElementById('preloader');
    let progress = 0;
    const interval = setInterval(() => {
        progress += Math.random() * 15 + 5;
        if (progress >= 100) {
            progress = 100;
            clearInterval(interval);
            setTimeout(() => preloader.classList.add('hidden'), 400);
        }
        fill.style.width = progress + '%';
        percent.textContent = Math.round(progress) + '%';
    }, 120);
})();

/* ══════════════════════════════════════════
   CUSTOM CURSOR
   ══════════════════════════════════════════ */
(function () {
    const dot = document.getElementById('cursor-dot');
    const ring = document.getElementById('cursor-ring');
    if (!dot || !ring) return;
    let mouseX = -100, mouseY = -100, ringX = -100, ringY = -100;

    document.addEventListener('mousemove', (e) => {
        mouseX = e.clientX; mouseY = e.clientY;
        dot.style.left = mouseX - 4 + 'px';
        dot.style.top = mouseY - 4 + 'px';
    });

    (function animateRing() {
        ringX += (mouseX - ringX) * 0.12;
        ringY += (mouseY - ringY) * 0.12;
        ring.style.left = ringX - 18 + 'px';
        ring.style.top = ringY - 18 + 'px';
        requestAnimationFrame(animateRing);
    })();

    document.querySelectorAll('a, button, .work-card, .service-card, .stat-item, .contact-link').forEach(el => {
        el.addEventListener('mouseenter', () => ring.classList.add('hovering'));
        el.addEventListener('mouseleave', () => ring.classList.remove('hovering'));
    });
})();

/* ══════════════════════════════════════════
   THREE.JS — PROFESSIONAL 3D COMPOSITION
   ══════════════════════════════════════════ */
(function () {
    const container = document.getElementById('canvas-container');
    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(60, window.innerWidth / window.innerHeight, 0.1, 1000);
    camera.position.z = 7;

    const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });
    renderer.setSize(window.innerWidth, window.innerHeight);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    container.appendChild(renderer.domElement);

    const clock = new THREE.Clock();
    const reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

    /* ─── Post-Processing (Bloom) ─── */
    let composer = null;
    let bloomPass = null;
    try {
        if (THREE.EffectComposer && THREE.RenderPass && THREE.UnrealBloomPass) {
            composer = new THREE.EffectComposer(renderer);
            composer.addPass(new THREE.RenderPass(scene, camera));
            bloomPass = new THREE.UnrealBloomPass(
                new THREE.Vector2(window.innerWidth, window.innerHeight),
                0.4,   // strength — subtle glow, not washed out
                0.2,   // radius
                0.85   // threshold — only the brightest edges bloom
            );
            composer.addPass(bloomPass);
        }
    } catch (e) { composer = null; }

    /* ─── Shared Simplex Noise GLSL ─── */
    const NOISE_GLSL = `
        vec3 mod289(vec3 x){return x-floor(x*(1.0/289.0))*289.0;}
        vec4 mod289(vec4 x){return x-floor(x*(1.0/289.0))*289.0;}
        vec4 permute(vec4 x){return mod289(((x*34.0)+1.0)*x);}

        float snoise(vec3 v){
            const vec2 C=vec2(1.0/6.0,1.0/3.0);
            const vec4 D=vec4(0.0,0.5,1.0,2.0);
            vec3 i=floor(v+dot(v,C.yyy));
            vec3 x0=v-i+dot(i,C.xxx);
            vec3 g=step(x0.yzx,x0.xyz);
            vec3 l=1.0-g;
            vec3 i1=min(g.xyz,l.zxy);
            vec3 i2=max(g.xyz,l.zxy);
            vec3 x1=x0-i1+C.xxx;
            vec3 x2=x0-i2+C.yyy;
            vec3 x3=x0-D.yyy;
            i=mod289(i);
            vec4 p=permute(permute(permute(
                i.z+vec4(0.0,i1.z,i2.z,1.0))
                +i.y+vec4(0.0,i1.y,i2.y,1.0))
                +i.x+vec4(0.0,i1.x,i2.x,1.0));
            float n_=0.142857142857;
            vec3 ns=n_*D.wyz-D.xzx;
            vec4 j=p-49.0*floor(p*ns.z*ns.z);
            vec4 x_=floor(j*ns.z);
            vec4 y_=floor(j-7.0*x_);
            vec4 x=x_*ns.x+ns.yyyy;
            vec4 y=y_*ns.x+ns.yyyy;
            vec4 h=1.0-abs(x)-abs(y);
            vec4 b0=vec4(x.xy,y.xy);
            vec4 b1=vec4(x.zw,y.zw);
            vec4 s0=floor(b0)*2.0+1.0;
            vec4 s1=floor(b1)*2.0+1.0;
            vec4 sh=-step(h,vec4(0.0));
            vec4 a0=b0.xzyw+s0.xzyw*sh.xxyy;
            vec4 a1=b1.xzyw+s1.xzyw*sh.zzww;
            vec3 p0=vec3(a0.xy,h.x);
            vec3 p1=vec3(a0.zw,h.y);
            vec3 p2=vec3(a1.xy,h.z);
            vec3 p3=vec3(a1.zw,h.w);
            vec4 norm=1.79284291400159-0.85373472095314*vec4(dot(p0,p0),dot(p1,p1),dot(p2,p2),dot(p3,p3));
            p0*=norm.x;p1*=norm.y;p2*=norm.z;p3*=norm.w;
            vec4 m=max(0.6-vec4(dot(x0,x0),dot(x1,x1),dot(x2,x2),dot(x3,x3)),0.0);
            m=m*m;
            return 42.0*dot(m*m,vec4(dot(p0,x0),dot(p1,x1),dot(p2,x2),dot(p3,x3)));
        }
    `;

    /* ─── Scene Group ─── */
    const world = new THREE.Group();
    scene.add(world);

    /* ═══════════════════════════════════════
       1. IRIDESCENT MORPHING SPHERE — Smooth Displaced Surface
       ═══════════════════════════════════════ */
    const sphereGeo = new THREE.IcosahedronGeometry(1.8, 5);
    const sphereMat = new THREE.ShaderMaterial({
        uniforms: {
            uTime: { value: 0 },
            uMorph: { value: 0 },
        },
        vertexShader: `
            ${NOISE_GLSL}
            uniform float uTime;
            uniform float uMorph;
            varying vec3 vWorldPos;
            varying float vDisp;
            varying vec3 vObjNormal;

            void main() {
                vec3 pos = position;
                vec3 norm = normalize(position);

                // Multi-octave noise displacement for organic shape
                float n1 = snoise(norm * 1.5 + uTime * 0.15) * 0.35;
                float n2 = snoise(norm * 3.0 - uTime * 0.12) * 0.18;
                float n3 = snoise(norm * 6.0 + uTime * 0.22) * 0.09;
                float n4 = snoise(norm * 12.0 + uTime * 0.35) * 0.04;
                float disp = n1 + n2 + n3 + n4;

                // Scroll morph intensifies displacement
                disp *= (1.0 + uMorph * 1.5);

                // Subtle breathing
                float breathe = sin(uTime * 0.5) * 0.03;

                pos = norm * (1.8 + disp + breathe);

                vDisp = disp;
                vWorldPos = (modelMatrix * vec4(pos, 1.0)).xyz;
                vObjNormal = norm;

                gl_Position = projectionMatrix * modelViewMatrix * vec4(pos, 1.0);
            }
        `,
        fragmentShader: `
            uniform float uTime;
            varying vec3 vWorldPos;
            varying float vDisp;
            varying vec3 vObjNormal;

            void main() {
                // Compute proper normals from displaced surface using screen-space derivatives
                vec3 normal = normalize(cross(dFdx(vWorldPos), dFdy(vWorldPos)));
                vec3 viewDir = normalize(cameraPosition - vWorldPos);

                // Fresnel rim glow
                float fresnel = pow(1.0 - abs(dot(viewDir, normal)), 3.0);

                // Thin-film iridescence effect
                float cosTheta = dot(viewDir, normal);
                float iri = cosTheta * 8.0 + uTime * 0.3 + vDisp * 4.0;
                vec3 iriColor = vec3(
                    sin(iri) * 0.5 + 0.5,
                    sin(iri + 2.094) * 0.5 + 0.5,
                    sin(iri + 4.189) * 0.5 + 0.5
                );

                // Base color gradient driven by displacement
                vec3 purple = vec3(0.37, 0.42, 0.82);
                vec3 pink = vec3(0.91, 0.45, 0.60);
                vec3 cyan = vec3(0.22, 0.74, 0.97);

                float t = clamp(vDisp * 2.5 + 0.5, 0.0, 1.0);
                vec3 base = mix(purple, pink, t);
                base = mix(base, cyan, clamp(fresnel * 0.7, 0.0, 1.0));

                // Blend base + iridescence
                vec3 color = mix(base, iriColor, 0.25 + fresnel * 0.25);

                // Subtle edge glow
                color += fresnel * vec3(0.4, 0.35, 0.7) * 0.6;

                // Dim specular highlights
                vec3 lightDir = normalize(vec3(1.0, 1.5, 2.0));
                vec3 halfDir = normalize(lightDir + viewDir);
                float spec = pow(max(dot(normal, halfDir), 0.0), 128.0);
                color += spec * vec3(0.7, 0.65, 0.8) * 0.2;

                // Second light for dimension
                vec3 lightDir2 = normalize(vec3(-1.0, -0.5, 1.0));
                vec3 halfDir2 = normalize(lightDir2 + viewDir);
                float spec2 = pow(max(dot(normal, halfDir2), 0.0), 64.0);
                color += spec2 * vec3(0.5, 0.35, 0.7) * 0.12;

                // Darken overall, keep semi-transparent
                color *= 0.55;
                float alpha = 0.65 + fresnel * 0.25;

                gl_FragColor = vec4(color, alpha);
            }
        `,
        transparent: true,
        depthWrite: false,
        side: THREE.FrontSide,
    });
    const mainSphere = new THREE.Mesh(sphereGeo, sphereMat);
    world.add(mainSphere);

    /* ═══════════════════════════════════════
       2. INNER ENERGY CORE — Bright Pulsing Glow
       ═══════════════════════════════════════ */
    const coreGeo = new THREE.SphereGeometry(0.4, 32, 32);
    const coreMat = new THREE.ShaderMaterial({
        uniforms: { uTime: { value: 0 } },
        vertexShader: `
            varying vec3 vNormal;
            varying vec3 vWorldPos;
            void main() {
                vNormal = normalize(normalMatrix * normal);
                vWorldPos = (modelMatrix * vec4(position, 1.0)).xyz;
                gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
            }
        `,
        fragmentShader: `
            uniform float uTime;
            varying vec3 vNormal;
            varying vec3 vWorldPos;
            void main() {
                vec3 viewDir = normalize(cameraPosition - vWorldPos);
                float fresnel = pow(1.0 - abs(dot(viewDir, vNormal)), 3.0);
                vec3 c1 = vec3(0.5, 0.55, 0.97);
                vec3 c2 = vec3(0.95, 0.5, 0.65);
                vec3 color = mix(c1, c2, sin(uTime * 0.4) * 0.5 + 0.5);
                float pulse = 0.5 + 0.25 * sin(uTime * 1.5);
                float alpha = (fresnel * 0.5 + 0.25) * pulse;
                color *= 0.7;
                gl_FragColor = vec4(color, alpha);
            }
        `,
        transparent: true,
        depthWrite: false,
        blending: THREE.AdditiveBlending,
    });
    const core = new THREE.Mesh(coreGeo, coreMat);
    world.add(core);

    /* ═══════════════════════════════════════
       3. VOLUMETRIC HALO — Multi-Layer Atmospheric Glow
       ═══════════════════════════════════════ */
    const haloGeo = new THREE.SphereGeometry(2.8, 32, 32);
    const haloMat = new THREE.ShaderMaterial({
        uniforms: { uTime: { value: 0 } },
        vertexShader: `
            varying vec3 vNormal;
            varying vec3 vWorldPos;
            void main() {
                vNormal = normalize(normalMatrix * normal);
                vWorldPos = (modelMatrix * vec4(position, 1.0)).xyz;
                gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
            }
        `,
        fragmentShader: `
            uniform float uTime;
            varying vec3 vNormal;
            varying vec3 vWorldPos;
            void main() {
                vec3 viewDir = normalize(cameraPosition - vWorldPos);
                float fresnel = pow(1.0 - abs(dot(viewDir, vNormal)), 5.0);
                vec3 c1 = vec3(0.37, 0.42, 0.82);
                vec3 c2 = vec3(0.91, 0.45, 0.60);
                vec3 c3 = vec3(0.22, 0.74, 0.97);
                float t = sin(uTime * 0.2) * 0.5 + 0.5;
                vec3 color = mix(mix(c1, c2, t), c3, fresnel * 0.6);
                float alpha = fresnel * 0.07 * (0.6 + 0.2 * sin(uTime * 0.4));
                gl_FragColor = vec4(color * 0.6, alpha);
            }
        `,
        transparent: true,
        depthWrite: false,
        blending: THREE.AdditiveBlending,
        side: THREE.BackSide,
    });
    const halo = new THREE.Mesh(haloGeo, haloMat);
    world.add(halo);

    // Second, larger halo layer for depth
    const halo2Geo = new THREE.SphereGeometry(3.8, 24, 24);
    const halo2Mat = haloMat.clone();
    halo2Mat.uniforms = { uTime: { value: 0 } };
    const halo2 = new THREE.Mesh(halo2Geo, halo2Mat);
    world.add(halo2);

    /* ═══════════════════════════════════════
       4. HOLOGRAPHIC TORUS KNOT — Primary Secondary Object
       ═══════════════════════════════════════ */
    const tkGeo = new THREE.TorusKnotGeometry(0.7, 0.18, 256, 32, 3, 5);
    const tkMat = new THREE.ShaderMaterial({
        uniforms: { uTime: { value: 0 } },
        vertexShader: `
            varying vec3 vWorldPos;
            varying vec3 vNormal;
            varying vec2 vUv;
            void main() {
                vUv = uv;
                vNormal = normalize(normalMatrix * normal);
                vWorldPos = (modelMatrix * vec4(position, 1.0)).xyz;
                gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
            }
        `,
        fragmentShader: `
            uniform float uTime;
            varying vec3 vWorldPos;
            varying vec3 vNormal;
            varying vec2 vUv;
            void main() {
                vec3 viewDir = normalize(cameraPosition - vWorldPos);
                float fresnel = pow(1.0 - abs(dot(viewDir, vNormal)), 2.5);

                // Holographic scan lines
                float scan = sin(vUv.x * 120.0 + uTime * 3.0) * 0.5 + 0.5;
                scan = pow(scan, 10.0);

                // Data flow effect
                float flow = sin(vUv.x * 30.0 - uTime * 5.0) * 0.5 + 0.5;
                flow = pow(flow, 4.0);

                // Iridescent color shift
                float iri = dot(viewDir, vNormal) * 6.0 + uTime * 0.5;
                vec3 iriColor = vec3(
                    sin(iri) * 0.5 + 0.5,
                    sin(iri + 2.094) * 0.5 + 0.5,
                    sin(iri + 4.189) * 0.5 + 0.5
                );

                vec3 baseColor = mix(vec3(0.37, 0.42, 0.82), vec3(0.22, 0.74, 0.97), fresnel);
                vec3 color = mix(baseColor, iriColor, 0.4);

                // Dim scan line highlights
                color += scan * vec3(0.3, 0.35, 0.6) * 0.15;
                color += flow * vec3(0.5, 0.3, 0.5) * 0.08;

                // Subtle edge glow
                color += fresnel * vec3(0.4, 0.35, 0.6) * 0.5;

                color *= 0.4;
                float alpha = fresnel * 0.45 + 0.08;
                alpha += scan * 0.04 + flow * 0.02;

                gl_FragColor = vec4(color, alpha);
            }
        `,
        transparent: true,
        depthWrite: false,
        side: THREE.DoubleSide,
        blending: THREE.AdditiveBlending,
    });
    const torusKnot = new THREE.Mesh(tkGeo, tkMat);
    const tkPivot = new THREE.Group();
    tkPivot.add(torusKnot);
    torusKnot.position.x = 3.5;
    tkPivot.rotation.x = Math.PI / 6;
    tkPivot.rotation.z = Math.PI / 10;
    world.add(tkPivot);

    /* ═══════════════════════════════════════
       5. SECOND TORUS KNOT — Smaller, Different Config
       ═══════════════════════════════════════ */
    const tk2Geo = new THREE.TorusKnotGeometry(0.4, 0.1, 200, 24, 2, 7);
    const tk2Mat = tkMat.clone();
    tk2Mat.uniforms = { uTime: { value: 0 } };
    const torusKnot2 = new THREE.Mesh(tk2Geo, tk2Mat);
    const tk2Pivot = new THREE.Group();
    tk2Pivot.add(torusKnot2);
    torusKnot2.position.x = 4.2;
    tk2Pivot.rotation.x = -Math.PI / 4;
    tk2Pivot.rotation.z = -Math.PI / 5;
    world.add(tk2Pivot);

    /* ═══════════════════════════════════════
       6. ENERGY FLOW RIBBONS (Animated Tubes)
       ═══════════════════════════════════════ */
    const ribbons = [];
    const ribbonConfigs = [
        { points: 80, radius: 3.0, height: 4.0, turns: 3, tubeR: 0.015, color1: [0.5, 0.55, 0.97], color2: [0.91, 0.45, 0.6], speed: 0.3, phase: 0 },
        { points: 80, radius: 3.5, height: 3.0, turns: 2, tubeR: 0.012, color1: [0.22, 0.74, 0.97], color2: [0.5, 0.55, 0.97], speed: -0.25, phase: Math.PI },
        { points: 80, radius: 2.8, height: 5.0, turns: 4, tubeR: 0.01, color1: [0.91, 0.45, 0.6], color2: [0.22, 0.74, 0.97], speed: 0.2, phase: Math.PI / 2 },
    ];

    ribbonConfigs.forEach(cfg => {
        const curvePoints = [];
        for (let i = 0; i < cfg.points; i++) {
            const t = i / (cfg.points - 1);
            const angle = t * Math.PI * 2 * cfg.turns + cfg.phase;
            const r = cfg.radius * (0.8 + 0.4 * Math.sin(t * Math.PI));
            curvePoints.push(new THREE.Vector3(
                Math.cos(angle) * r,
                (t - 0.5) * cfg.height,
                Math.sin(angle) * r
            ));
        }
        const curve = new THREE.CatmullRomCurve3(curvePoints);
        const geo = new THREE.TubeGeometry(curve, 200, cfg.tubeR, 8, false);
        const mat = new THREE.ShaderMaterial({
            uniforms: { uTime: { value: 0 } },
            vertexShader: `
                varying vec2 vUv;
                varying vec3 vNormal;
                varying vec3 vWorldPos;
                void main() {
                    vUv = uv;
                    vNormal = normalize(normalMatrix * normal);
                    vWorldPos = (modelMatrix * vec4(position, 1.0)).xyz;
                    gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
                }
            `,
            fragmentShader: `
                uniform float uTime;
                varying vec2 vUv;
                varying vec3 vNormal;
                varying vec3 vWorldPos;
                void main() {
                    vec3 viewDir = normalize(cameraPosition - vWorldPos);
                    float fresnel = pow(1.0 - abs(dot(viewDir, vNormal)), 2.0);

                    // Flowing pulse along the ribbon
                    float pulse = sin(vUv.x * 40.0 - uTime * 6.0) * 0.5 + 0.5;
                    pulse = pow(pulse, 3.0);

                    vec3 c1 = vec3(${cfg.color1.join(',')});
                    vec3 c2 = vec3(${cfg.color2.join(',')});
                    vec3 color = mix(c1, c2, vUv.x) * 0.35;
                    color += pulse * vec3(0.5, 0.4, 0.7) * 0.15;
                    color += fresnel * vec3(0.3, 0.25, 0.5) * 0.3;

                    float alpha = (0.15 + pulse * 0.2 + fresnel * 0.15) * 0.5;
                    gl_FragColor = vec4(color, alpha);
                }
            `,
            transparent: true,
            depthWrite: false,
            blending: THREE.AdditiveBlending,
            side: THREE.DoubleSide,
        });
        const mesh = new THREE.Mesh(geo, mat);
        world.add(mesh);
        ribbons.push({ mesh, speed: cfg.speed, mat });
    });

    /* ═══════════════════════════════════════
       7. CONSTELLATION NETWORK — Nodes + Lines
       ═══════════════════════════════════════ */
    const NODE_COUNT = 300;
    const nodePos = new Float32Array(NODE_COUNT * 3);
    const nodeOrig = new Float32Array(NODE_COUNT * 3);
    const nodeCol = new Float32Array(NODE_COUNT * 3);
    const nodeSiz = new Float32Array(NODE_COUNT);

    for (let i = 0; i < NODE_COUNT; i++) {
        const phi = Math.acos(2 * Math.random() - 1);
        const theta = Math.random() * Math.PI * 2;
        const r = 2.8 + Math.random() * 2.5;
        const x = r * Math.sin(phi) * Math.cos(theta);
        const y = r * Math.sin(phi) * Math.sin(theta);
        const z = r * Math.cos(phi);
        nodeOrig[i * 3] = nodePos[i * 3] = x;
        nodeOrig[i * 3 + 1] = nodePos[i * 3 + 1] = y;
        nodeOrig[i * 3 + 2] = nodePos[i * 3 + 2] = z;

        const t = Math.random();
        nodeCol[i * 3] = 0.37 + t * 0.54;
        nodeCol[i * 3 + 1] = 0.42 + t * 0.32;
        nodeCol[i * 3 + 2] = 0.82 + t * 0.15;
        nodeSiz[i] = Math.random() * 3.5 + 1;
    }

    const nodeGeo = new THREE.BufferGeometry();
    nodeGeo.setAttribute('position', new THREE.BufferAttribute(nodePos, 3));
    nodeGeo.setAttribute('color', new THREE.BufferAttribute(nodeCol, 3));
    nodeGeo.setAttribute('size', new THREE.BufferAttribute(nodeSiz, 1));

    const nodeMat = new THREE.ShaderMaterial({
        uniforms: { uTime: { value: 0 } },
        vertexShader: `
            attribute float size;
            varying vec3 vColor;
            varying float vAlpha;
            uniform float uTime;
            void main() {
                vColor = color;
                vec4 mv = modelViewMatrix * vec4(position, 1.0);
                gl_PointSize = size * (200.0 / -mv.z);
                gl_Position = projectionMatrix * mv;
                vAlpha = 0.5 + 0.3 * sin(uTime * 0.5 + position.x * 2.0);
            }
        `,
        fragmentShader: `
            varying vec3 vColor;
            varying float vAlpha;
            void main() {
                float d = length(gl_PointCoord - vec2(0.5));
                if (d > 0.5) discard;
                float a = (1.0 - smoothstep(0.0, 0.5, d)) * vAlpha;
                gl_FragColor = vec4(vColor * 0.5, a * 0.6);
            }
        `,
        transparent: true,
        depthWrite: false,
        blending: THREE.AdditiveBlending,
        vertexColors: true,
    });
    const nodePoints = new THREE.Points(nodeGeo, nodeMat);
    world.add(nodePoints);

    // Pre-compute connections
    const connections = [];
    const CONN_DIST = 1.6;
    for (let i = 0; i < NODE_COUNT; i++) {
        for (let j = i + 1; j < NODE_COUNT; j++) {
            const dx = nodeOrig[i * 3] - nodeOrig[j * 3];
            const dy = nodeOrig[i * 3 + 1] - nodeOrig[j * 3 + 1];
            const dz = nodeOrig[i * 3 + 2] - nodeOrig[j * 3 + 2];
            const dist = Math.sqrt(dx * dx + dy * dy + dz * dz);
            if (dist < CONN_DIST) connections.push([i, j, dist]);
        }
    }
    connections.sort((a, b) => a[2] - b[2]);
    const MAX_CONN = Math.min(connections.length, 600);

    const linePositions = new Float32Array(MAX_CONN * 6);
    const lineColors = new Float32Array(MAX_CONN * 6);
    for (let c = 0; c < MAX_CONN; c++) {
        const alpha = 1 - connections[c][2] / CONN_DIST;
        const r = 0.4 + alpha * 0.3, g = 0.45 + alpha * 0.2, b = 0.9;
        lineColors[c * 6] = r; lineColors[c * 6 + 1] = g; lineColors[c * 6 + 2] = b;
        lineColors[c * 6 + 3] = r; lineColors[c * 6 + 4] = g; lineColors[c * 6 + 5] = b;
    }

    const lineGeo = new THREE.BufferGeometry();
    lineGeo.setAttribute('position', new THREE.BufferAttribute(linePositions, 3));
    lineGeo.setAttribute('color', new THREE.BufferAttribute(lineColors, 3));

    const lineMat = new THREE.LineBasicMaterial({
        transparent: true, opacity: 0.04,
        vertexColors: true, blending: THREE.AdditiveBlending, depthWrite: false,
    });
    const linesMesh = new THREE.LineSegments(lineGeo, lineMat);
    world.add(linesMesh);

    /* ═══════════════════════════════════════
       8. SATELLITE POLYHEDRA (x6)
       ═══════════════════════════════════════ */
    const satellites = [];
    const satConfigs = [
        { type: 'oct', r: 0.14, orbit: 4.5, speed: 0.4, phase: 0, freqY: 1.3, freqZ: 1.0, color: '#818CF8' },
        { type: 'tet', r: 0.12, orbit: 3.8, speed: -0.35, phase: 1, freqY: 0.7, freqZ: 1.2, color: '#E8729A' },
        { type: 'dod', r: 0.10, orbit: 5.0, speed: 0.25, phase: 2, freqY: 1.1, freqZ: 0.8, color: '#38BDF8' },
        { type: 'ico', r: 0.09, orbit: 3.2, speed: -0.5, phase: 3, freqY: 0.9, freqZ: 1.4, color: '#818CF8' },
        { type: 'tet', r: 0.11, orbit: 4.8, speed: 0.3, phase: 4, freqY: 1.5, freqZ: 0.6, color: '#E8729A' },
        { type: 'dod', r: 0.08, orbit: 5.2, speed: -0.45, phase: 5, freqY: 0.8, freqZ: 1.1, color: '#38BDF8' },
    ];

    satConfigs.forEach(cfg => {
        let geo;
        switch (cfg.type) {
            case 'oct': geo = new THREE.OctahedronGeometry(cfg.r); break;
            case 'tet': geo = new THREE.TetrahedronGeometry(cfg.r); break;
            case 'dod': geo = new THREE.DodecahedronGeometry(cfg.r); break;
            case 'ico': geo = new THREE.IcosahedronGeometry(cfg.r); break;
        }
        const mat = new THREE.MeshBasicMaterial({
            color: cfg.color, wireframe: true, transparent: true, opacity: 0.2,
        });
        const mesh = new THREE.Mesh(geo, mat);
        world.add(mesh);
        satellites.push({ mesh, ...cfg });
    });

    /* ═══════════════════════════════════════
       9. HOLOGRAPHIC ORBITAL RINGS (x3)
       ═══════════════════════════════════════ */
    const rings = [];
    const ringConfigs = [
        { r: 3.2, tube: 0.008, color: '#5E6AD2', opacity: 0.18, rotX: Math.PI / 2, rotSpeed: 0.03 },
        { r: 4.0, tube: 0.006, color: '#E8729A', opacity: 0.12, rotX: Math.PI / 2.8, rotSpeed: -0.02 },
        { r: 4.8, tube: 0.007, color: '#38BDF8', opacity: 0.10, rotX: Math.PI / 5, rotSpeed: 0.015 },
    ];

    ringConfigs.forEach(cfg => {
        const geo = new THREE.TorusGeometry(cfg.r, cfg.tube, 8, 200);
        const mat = new THREE.MeshBasicMaterial({
            color: cfg.color, transparent: true, opacity: cfg.opacity * 0.5,
            side: THREE.DoubleSide, blending: THREE.AdditiveBlending,
        });
        const mesh = new THREE.Mesh(geo, mat);
        mesh.rotation.x = cfg.rotX;
        world.add(mesh);
        rings.push({ mesh, rotSpeed: cfg.rotSpeed });
    });

    /* ═══════════════════════════════════════
       10. ENHANCED PARTICLE DUST FIELD
       ═══════════════════════════════════════ */
    const DUST_COUNT = 1200;
    const dustGeo = new THREE.BufferGeometry();
    const dPos = new Float32Array(DUST_COUNT * 3);
    const dCol = new Float32Array(DUST_COUNT * 3);
    const dSiz = new Float32Array(DUST_COUNT);

    const dustPalette = [
        [0.51, 0.55, 0.97], [0.91, 0.45, 0.60],
        [0.22, 0.74, 0.97], [0.37, 0.42, 0.82], [0.7, 0.6, 1.0],
    ];

    for (let i = 0; i < DUST_COUNT; i++) {
        dPos[i * 3] = (Math.random() - 0.5) * 28;
        dPos[i * 3 + 1] = (Math.random() - 0.5) * 28;
        dPos[i * 3 + 2] = (Math.random() - 0.5) * 28;
        const c = dustPalette[Math.floor(Math.random() * dustPalette.length)];
        const v = 0.6 + Math.random() * 0.4;
        dCol[i * 3] = c[0] * v;
        dCol[i * 3 + 1] = c[1] * v;
        dCol[i * 3 + 2] = c[2] * v;
        dSiz[i] = Math.random() * 2.5 + 0.5;
    }

    dustGeo.setAttribute('position', new THREE.BufferAttribute(dPos, 3));
    dustGeo.setAttribute('color', new THREE.BufferAttribute(dCol, 3));
    dustGeo.setAttribute('size', new THREE.BufferAttribute(dSiz, 1));

    const dustMat = new THREE.ShaderMaterial({
        uniforms: { uTime: { value: 0 } },
        vertexShader: `
            attribute float size;
            varying vec3 vColor;
            varying float vAlpha;
            uniform float uTime;
            void main() {
                vColor = color;
                vec3 p = position;
                p.y += sin(uTime * 0.2 + position.x * 0.5) * 0.3;
                p.x += cos(uTime * 0.15 + position.z * 0.3) * 0.2;
                p.z += sin(uTime * 0.12 + position.y * 0.4) * 0.15;
                vec4 mv = modelViewMatrix * vec4(p, 1.0);
                gl_PointSize = size * (140.0 / -mv.z);
                gl_Position = projectionMatrix * mv;
                vAlpha = 0.06 + 0.04 * sin(uTime * 0.8 + position.x + position.z);
            }
        `,
        fragmentShader: `
            varying vec3 vColor;
            varying float vAlpha;
            void main() {
                float d = length(gl_PointCoord - vec2(0.5));
                if (d > 0.5) discard;
                float a = (1.0 - smoothstep(0.0, 0.5, d)) * vAlpha;
                gl_FragColor = vec4(vColor, a);
            }
        `,
        transparent: true,
        depthWrite: false,
        blending: THREE.AdditiveBlending,
        vertexColors: true,
    });
    const dustPoints = new THREE.Points(dustGeo, dustMat);
    scene.add(dustPoints);

    /* ═══════════════════════════════════════
       11. ENERGY PARTICLE TRAILS
       ═══════════════════════════════════════ */
    const TRAIL_COUNT = 100;
    const trailGeo = new THREE.BufferGeometry();
    const tPos = new Float32Array(TRAIL_COUNT * 3);
    const tSiz = new Float32Array(TRAIL_COUNT);
    const tCol = new Float32Array(TRAIL_COUNT * 3);
    const trailData = [];

    const trailPalette = [[0.6, 0.5, 0.95], [0.9, 0.5, 0.65], [0.3, 0.7, 0.95]];

    for (let i = 0; i < TRAIL_COUNT; i++) {
        const angle = Math.random() * Math.PI * 2;
        const tilt = (Math.random() - 0.5) * Math.PI * 0.8;
        const r = 2.2 + Math.random() * 0.8;
        trailData.push({ angle, tilt, r, speed: 0.3 + Math.random() * 0.5, phase: Math.random() * Math.PI * 2 });
        tPos[i * 3] = Math.cos(angle) * r * Math.cos(tilt);
        tPos[i * 3 + 1] = Math.sin(tilt) * r;
        tPos[i * 3 + 2] = Math.sin(angle) * r * Math.cos(tilt);
        tSiz[i] = Math.random() * 3.5 + 2;
        const c = trailPalette[Math.floor(Math.random() * trailPalette.length)];
        tCol[i * 3] = c[0]; tCol[i * 3 + 1] = c[1]; tCol[i * 3 + 2] = c[2];
    }

    trailGeo.setAttribute('position', new THREE.BufferAttribute(tPos, 3));
    trailGeo.setAttribute('size', new THREE.BufferAttribute(tSiz, 1));
    trailGeo.setAttribute('color', new THREE.BufferAttribute(tCol, 3));

    const trailMat = new THREE.ShaderMaterial({
        uniforms: { uTime: { value: 0 } },
        vertexShader: `
            attribute float size;
            uniform float uTime;
            varying float vAlpha;
            varying vec3 vColor;
            void main() {
                vColor = color;
                vec4 mv = modelViewMatrix * vec4(position, 1.0);
                gl_PointSize = size * (160.0 / -mv.z);
                gl_Position = projectionMatrix * mv;
                vAlpha = 0.4 + 0.3 * sin(uTime * 2.0 + position.x * 3.0);
            }
        `,
        fragmentShader: `
            varying float vAlpha;
            varying vec3 vColor;
            void main() {
                float d = length(gl_PointCoord - vec2(0.5));
                if (d > 0.5) discard;
                float a = (1.0 - smoothstep(0.0, 0.35, d)) * vAlpha;
                gl_FragColor = vec4(vColor * 0.5, a * 0.5);
            }
        `,
        transparent: true,
        depthWrite: false,
        blending: THREE.AdditiveBlending,
        vertexColors: true,
    });
    const trailPoints = new THREE.Points(trailGeo, trailMat);
    world.add(trailPoints);

    /* ═══════════════════════════════════════
       MOUSE + SCROLL TRACKING
       ═══════════════════════════════════════ */
    let mouseX = 0, mouseY = 0, tMouseX = 0, tMouseY = 0;
    let scrollMorph = 0, targetMorph = 0;

    document.addEventListener('mousemove', (e) => {
        tMouseX = (e.clientX / window.innerWidth - 0.5) * 2;
        tMouseY = (e.clientY / window.innerHeight - 0.5) * 2;
    });

    window.addEventListener('scroll', () => {
        targetMorph = window.scrollY / (document.body.scrollHeight - window.innerHeight);
    });

    /* ═══════════════════════════════════════
       ANIMATION LOOP
       ═══════════════════════════════════════ */
    let lastTime = 0;
    (function animate() {
        requestAnimationFrame(animate);
        const t = clock.getElapsedTime();
        const dt = t - lastTime;
        lastTime = t;

        // Smooth mouse + scroll
        mouseX += (tMouseX - mouseX) * 0.05;
        mouseY += (tMouseY - mouseY) * 0.05;
        scrollMorph += (targetMorph - scrollMorph) * 0.05;
        const morph = reducedMotion ? 0 : scrollMorph * 3;

        // ── Update uniforms ──
        sphereMat.uniforms.uTime.value = t;
        sphereMat.uniforms.uMorph.value = morph;
        coreMat.uniforms.uTime.value = t;
        haloMat.uniforms.uTime.value = t;
        halo2Mat.uniforms.uTime.value = t;
        tkMat.uniforms.uTime.value = t;
        tk2Mat.uniforms.uTime.value = t;
        nodeMat.uniforms.uTime.value = t;
        dustMat.uniforms.uTime.value = t;
        trailMat.uniforms.uTime.value = t;
        ribbons.forEach(r => r.mat.uniforms.uTime.value = t);

        // ── 1. Main sphere rotation (mouse-reactive) ──
        mainSphere.rotation.y = t * 0.06 + mouseX * 0.3;
        mainSphere.rotation.x = t * 0.04 + mouseY * 0.2;

        // ── 2. Core pulsation ──
        const coreScale = 1.0 + Math.sin(t * 1.5) * 0.3 + Math.sin(t * 3.7) * 0.1;
        core.scale.setScalar(coreScale);
        core.rotation.y = t * 0.3;

        // ── 3. Halo breathing ──
        halo.scale.setScalar(1.0 + Math.sin(t * 0.4) * 0.05);
        halo2.scale.setScalar(1.0 + Math.sin(t * 0.3 + 1) * 0.03);

        // ── 4-5. Torus knot orbits ──
        tkPivot.rotation.y += 0.15 * dt;
        torusKnot.rotation.x = t * 0.4;
        torusKnot.rotation.z = t * 0.3;
        const tkBreathe = 1.0 + Math.sin(t * 1.5) * 0.12;
        torusKnot.scale.setScalar(tkBreathe);

        tk2Pivot.rotation.y -= 0.12 * dt;
        torusKnot2.rotation.x = -t * 0.5;
        torusKnot2.rotation.z = t * 0.35;
        torusKnot2.scale.setScalar(1.0 + Math.sin(t * 2 + 1) * 0.1);

        // ── 6. Ribbons rotation ──
        ribbons.forEach(r => {
            r.mesh.rotation.y += r.speed * dt;
        });

        // ── 7. Constellation nodes + lines ──
        for (let i = 0; i < NODE_COUNT; i++) {
            const ox = nodeOrig[i * 3], oy = nodeOrig[i * 3 + 1], oz = nodeOrig[i * 3 + 2];
            const n = Math.sin(t * 0.3 + ox * 2.0) * 0.12 + Math.cos(t * 0.2 + oy * 1.5) * 0.08;
            const expansion = 1.0 + morph * 0.4;
            nodePos[i * 3] = ox * (1.0 + n) * expansion;
            nodePos[i * 3 + 1] = oy * (1.0 + n) * expansion;
            nodePos[i * 3 + 2] = oz * (1.0 + n) * expansion;
        }
        nodeGeo.attributes.position.needsUpdate = true;

        for (let c = 0; c < MAX_CONN; c++) {
            const [i, j] = connections[c];
            linePositions[c * 6] = nodePos[i * 3];
            linePositions[c * 6 + 1] = nodePos[i * 3 + 1];
            linePositions[c * 6 + 2] = nodePos[i * 3 + 2];
            linePositions[c * 6 + 3] = nodePos[j * 3];
            linePositions[c * 6 + 4] = nodePos[j * 3 + 1];
            linePositions[c * 6 + 5] = nodePos[j * 3 + 2];
        }
        lineGeo.attributes.position.needsUpdate = true;

        // ── 8. Satellite orbits ──
        satellites.forEach(s => {
            const a = t * s.speed + s.phase * Math.PI * 0.25;
            s.mesh.position.x = Math.cos(a) * s.orbit;
            s.mesh.position.y = Math.sin(a * s.freqY) * s.orbit * 0.4;
            s.mesh.position.z = Math.sin(a * s.freqZ) * s.orbit;
            s.mesh.rotation.x += 0.02;
            s.mesh.rotation.y += 0.015;
            s.mesh.rotation.z += 0.01;
            s.mesh.scale.setScalar(1.0 + Math.sin(t * 2.0 + s.phase) * 0.2);
        });

        // ── 9. Ring rotation ──
        rings.forEach(r => {
            r.mesh.rotation.z += r.rotSpeed * dt;
            r.mesh.rotation.y += r.rotSpeed * 0.5 * dt;
        });

        // ── 10. Energy trails ──
        for (let i = 0; i < TRAIL_COUNT; i++) {
            const d = trailData[i];
            const a = d.angle + t * d.speed;
            const pulse = d.r + Math.sin(t * 2.0 + d.phase) * 0.2;
            tPos[i * 3] = Math.cos(a) * pulse * Math.cos(d.tilt);
            tPos[i * 3 + 1] = Math.sin(d.tilt) * pulse + Math.sin(t * 1.5 + d.phase) * 0.3;
            tPos[i * 3 + 2] = Math.sin(a) * pulse * Math.cos(d.tilt);
        }
        trailGeo.attributes.position.needsUpdate = true;

        // ── Camera (mouse-driven parallax) ──
        camera.position.x = mouseX * 0.5;
        camera.position.y = -mouseY * 0.4;
        camera.lookAt(0, 0, 0);

        // Scale scene on scroll
        const s = Math.max(1.0 - scrollMorph * 0.3, 0.5);
        world.scale.setScalar(s);

        // Render with post-processing or fallback
        if (composer) {
            composer.render();
        } else {
            renderer.render(scene, camera);
        }
    })();

    /* ─── Resize ─── */
    window.addEventListener('resize', () => {
        camera.aspect = window.innerWidth / window.innerHeight;
        camera.updateProjectionMatrix();
        renderer.setSize(window.innerWidth, window.innerHeight);
        renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
        if (composer) {
            composer.setSize(window.innerWidth, window.innerHeight);
        }
    });
})();

/* ══════════════════════════════════════════
   GSAP ANIMATIONS
   ══════════════════════════════════════════ */
gsap.registerPlugin(ScrollTrigger);

// Hero entrance
gsap.timeline({ delay: 1.2 })
    .to('.hero-tag', { opacity: 1, y: 0, duration: 0.8, ease: 'power3.out' })
    .to('.hero-title', { opacity: 1, y: 0, duration: 1, ease: 'power3.out' }, '-=0.5')
    .to('.hero-description', { opacity: 1, y: 0, duration: 0.8, ease: 'power3.out' }, '-=0.6')
    .to('.hero-cta', { opacity: 1, y: 0, duration: 0.8, ease: 'power3.out' }, '-=0.5')
    .to('.scroll-indicator', { opacity: 1, duration: 0.6 }, '-=0.3');

// Hero parallax on scroll
gsap.to('.hero-content', {
    y: -100, opacity: 0, ease: 'none',
    scrollTrigger: { trigger: '.hero', start: 'top top', end: 'bottom top', scrub: 1 }
});
gsap.to('.scroll-indicator', {
    opacity: 0,
    scrollTrigger: { trigger: '.hero', start: '10% top', end: '20% top', scrub: 1 }
});

// Scroll reveals
document.querySelectorAll('.reveal, .reveal-left, .reveal-right, .reveal-scale').forEach(el => {
    const from = { opacity: 0 };
    const to = { opacity: 1, duration: 1, ease: 'power3.out' };

    if (el.classList.contains('reveal')) { from.y = 40; to.y = 0; }
    else if (el.classList.contains('reveal-left')) { from.x = -40; to.x = 0; }
    else if (el.classList.contains('reveal-right')) { from.x = 40; to.x = 0; }
    else if (el.classList.contains('reveal-scale')) { from.scale = 0.9; to.scale = 1; }

    gsap.fromTo(el, from, {
        ...to,
        scrollTrigger: { trigger: el, start: 'top 85%', end: 'top 60%', toggleActions: 'play none none reverse' }
    });
});

// Service cards stagger
gsap.utils.toArray('.service-card').forEach((card, i) => {
    gsap.fromTo(card, { opacity: 0, y: 50, scale: 0.95 }, {
        opacity: 1, y: 0, scale: 1, duration: 0.8, delay: i * 0.08, ease: 'power3.out',
        scrollTrigger: { trigger: card, start: 'top 88%', toggleActions: 'play none none reverse' }
    });
});

// Work cards
gsap.utils.toArray('.work-card').forEach((card, i) => {
    gsap.fromTo(card, { opacity: 0, scale: 0.9, y: 40 }, {
        opacity: 1, scale: 1, y: 0, duration: 1, delay: i * 0.1, ease: 'power3.out',
        scrollTrigger: { trigger: card, start: 'top 88%', toggleActions: 'play none none reverse' }
    });
});

// Testimonials
gsap.utils.toArray('.testimonial-card').forEach((card, i) => {
    gsap.fromTo(card, { opacity: 0, y: 40, rotateY: 5 }, {
        opacity: 1, y: 0, rotateY: 0, duration: 0.9, delay: i * 0.12, ease: 'power3.out',
        scrollTrigger: { trigger: card, start: 'top 85%', toggleActions: 'play none none reverse' }
    });
});

// Stats counter
document.querySelectorAll('.stat-number[data-count]').forEach(counter => {
    const target = parseInt(counter.dataset.count);
    ScrollTrigger.create({
        trigger: counter, start: 'top 85%', once: true,
        onEnter: () => {
            gsap.to({ val: 0 }, {
                val: target, duration: 2, ease: 'power2.out',
                onUpdate() { counter.textContent = Math.round(this.targets()[0].val) + '+'; }
            });
        }
    });
});

/* ══════════════════════════════════════════
   NAVIGATION
   ══════════════════════════════════════════ */
window.addEventListener('scroll', () => {
    document.getElementById('nav').classList.toggle('scrolled', window.scrollY > 50);
    document.getElementById('scroll-progress').style.width =
        (window.scrollY / (document.body.scrollHeight - window.innerHeight) * 100) + '%';
});

// Mobile menu
const menuBtn = document.getElementById('menu-btn');
const mobileMenu = document.getElementById('mobile-menu');
menuBtn.addEventListener('click', () => {
    menuBtn.classList.toggle('active');
    mobileMenu.classList.toggle('active');
    document.body.style.overflow = mobileMenu.classList.contains('active') ? 'hidden' : '';
});
mobileMenu.querySelectorAll('a').forEach(a => a.addEventListener('click', () => {
    menuBtn.classList.remove('active');
    mobileMenu.classList.remove('active');
    document.body.style.overflow = '';
}));

/* ══════════════════════════════════════════
   PROCESS TIMELINE
   ══════════════════════════════════════════ */
(function () {
    const steps = document.querySelectorAll('.process-step');
    const lineFill = document.getElementById('process-line-fill');
    if (!steps.length || !lineFill) return;

    steps.forEach((step) => {
        ScrollTrigger.create({
            trigger: step,
            start: 'top 70%',
            onEnter: () => step.classList.add('active'),
            onLeaveBack: () => step.classList.remove('active'),
        });

        gsap.fromTo(step, { opacity: 0, y: 40 }, {
            opacity: 1, y: 0, duration: 0.8, ease: 'power3.out',
            scrollTrigger: { trigger: step, start: 'top 85%', toggleActions: 'play none none reverse' }
        });
    });

    gsap.to(lineFill, {
        height: '100%', ease: 'none',
        scrollTrigger: {
            trigger: '.process-timeline',
            start: 'top 60%', end: 'bottom 40%', scrub: 0.5,
        }
    });
})();

/* ══════════════════════════════════════════
   SMOOTH SCROLL
   ══════════════════════════════════════════ */
document.querySelectorAll('a[href^="#"]').forEach(a => {
    a.addEventListener('click', (e) => {
        e.preventDefault();
        const el = document.querySelector(a.getAttribute('href'));
        if (el) el.scrollIntoView({ behavior: 'smooth', block: 'start' });
    });
});
