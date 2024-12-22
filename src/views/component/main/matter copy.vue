<template>
  <div ref="matterContainer" class="w-full h-full rounded-2xl"></div>
</template>

<script setup>
import { onMounted, onBeforeUnmount, ref } from 'vue';
import Matter from 'matter-js';

const matterContainer = ref(null);
let engine, render, runner;

onMounted(() => {
  // Create an engine
  engine = Matter.Engine.create();
  const world = engine.world;

  // Create a renderer and attach it to the container
  render = Matter.Render.create({
    element: matterContainer.value, // Attach to the DOM element
    engine: engine,
    options: {
      width: matterContainer.value.clientWidth,
      height: matterContainer.value.clientHeight,
      wireframes: false, // Use solid rendering
      background: 'rgb(109, 40, 217)', // Set background color to purple
    },
  });

  Matter.Render.run(render);

  // Create a runner
  runner = Matter.Runner.create();
  Matter.Runner.run(runner, engine);

  // Create stairs
  const stairCount = (render.bounds.max.y - render.bounds.min.y) / 50;
  const stack = Matter.Composites.stack(0, 0, stairCount + 2, 1, 0, 0, (x, y, column) => {
    return Matter.Bodies.rectangle(x - 50, y + column * 50, 100, 1000, {
      isStatic: true,
      render: {
        fillStyle: '#060a19',
        strokeStyle: '#ffffff',
        lineWidth: 1,
      },
    });
  });

  // Create obstacles
  const obstacles = Matter.Composites.stack(300, 0, 15, 3, 10, 10, (x, y, column) => {
    const sides = Math.round(Matter.Common.random(1, 8));
    const options = {
      render: {
        fillStyle: Matter.Common.choose(['#f19648', '#f5d259', '#f55a3c', '#063e7b', '#ececd1']),
      },
    };

    switch (Math.round(Matter.Common.random(0, 1))) {
      case 0:
        if (Matter.Common.random() < 0.8) {
          return Matter.Bodies.rectangle(x, y, Matter.Common.random(25, 50), Matter.Common.random(25, 50), options);
        } else {
          return Matter.Bodies.rectangle(x, y, Matter.Common.random(80, 120), Matter.Common.random(25, 30), options);
        }
      case 1:
        return Matter.Bodies.polygon(x, y, sides, Matter.Common.random(25, 50), options);
    }
  });

  // Create ragdolls
  const ragdolls = Matter.Composite.create();
  for (let i = 0; i < 1; i += 1) {
    const ragdoll = createRagdoll(200, -1000 * i, 1.3);
    Matter.Composite.add(ragdolls, ragdoll);
  }

  Matter.Composite.add(world, [stack, obstacles, ragdolls]);

  // Add mouse control
  const mouse = Matter.Mouse.create(render.canvas);
  const mouseConstraint = Matter.MouseConstraint.create(engine, {
    mouse: mouse,
    constraint: {
      stiffness: 0.2,
      render: {
        visible: false,
      },
    },
  });

  Matter.World.add(world, mouseConstraint);

  // Ensure the canvas resizes with the window
  window.addEventListener('resize', handleResize);

  // Animation logic
  let timeScaleTarget = 1;
  let counter = 0;

  Matter.Events.on(engine, 'afterUpdate', (event) => {
    if (mouse.button === -1) {
      engine.timing.timeScale += (timeScaleTarget - engine.timing.timeScale) * 0.05;
    } else {
      engine.timing.timeScale = 1;
    }

    counter += 1;

    if (counter >= 60 * 1.5) {
      timeScaleTarget = timeScaleTarget < 1 ? 1 : 0.05;
      counter = 0;
    }

    stack.bodies.forEach((body) => {
      Matter.Body.translate(body, {
        x: -0.5 * engine.timing.timeScale,
        y: -0.5 * engine.timing.timeScale,
      });

      if (body.position.x < -50) {
        Matter.Body.setPosition(body, {
          x: 50 * (stack.bodies.length - 1),
          y: 25 + render.bounds.max.y + (body.bounds.max.y - body.bounds.min.y) * 0.5,
        });
        Matter.Body.setVelocity(body, { x: 0, y: 0 });
      }
    });

    ragdolls.composites.forEach((ragdoll) => {
      const bounds = Matter.Composite.bounds(ragdoll);
      if (bounds.min.y > render.bounds.max.y + 100) {
        Matter.Composite.translate(ragdoll, {
          x: -bounds.min.x * 0.9,
          y: -render.bounds.max.y - 400,
        });
      }
    });

    obstacles.bodies.forEach((body) => {
      const bounds = body.bounds;
      if (bounds.min.y > render.bounds.max.y + 100) {
        Matter.Body.translate(body, {
          x: -bounds.min.x,
          y: -render.bounds.max.y - 300,
        });
      }
    });
  });
});

onBeforeUnmount(() => {
  // Cleanup Matter.js resources on component unmount
  Matter.Render.stop(render);
  Matter.Runner.stop(runner);
  Matter.World.clear(engine.world);
  Matter.Engine.clear(engine);

  window.removeEventListener('resize', handleResize);
});

// Resize canvas dynamically
const handleResize = () => {
  if (render && matterContainer.value) {
    const width = matterContainer.value.clientWidth;
    const height = matterContainer.value.clientHeight;
    Matter.Render.setSize(render, width, height);
  }
};

// Function to create a ragdoll
const createRagdoll = (x, y, scale, options = {}) => {
  const { Body, Bodies, Constraint, Composite, Common } = Matter;

  const headOptions = Common.extend({
    label: 'head',
    collisionFilter: { group: Body.nextGroup(true) },
    chamfer: { radius: [15 * scale, 15 * scale, 15 * scale, 15 * scale] },
    render: { fillStyle: '#FFBC42' },
  }, options);

  const chestOptions = Common.extend({
    label: 'chest',
    collisionFilter: { group: Body.nextGroup(true) },
    chamfer: { radius: [20 * scale, 20 * scale, 26 * scale, 26 * scale] },
    render: { fillStyle: '#E0A423' },
  }, options);

  const leftArmOptions = Common.extend({
    label: 'left-arm',
    collisionFilter: { group: Body.nextGroup(true) },
    chamfer: { radius: 10 * scale },
    render: { fillStyle: '#FFBC42' },
  }, options);

  const leftLowerArmOptions = Common.extend({}, leftArmOptions, {
    render: { fillStyle: '#E59B12' },
  });

  const rightArmOptions = Common.extend({
    label: 'right-arm',
    collisionFilter: { group: Body.nextGroup(true) },
    chamfer: { radius: 10 * scale },
    render: { fillStyle: '#FFBC42' },
  }, options);

  const rightLowerArmOptions = Common.extend({}, rightArmOptions, {
    render: { fillStyle: '#E59B12' },
  });

  const leftLegOptions = Common.extend({
    label: 'left-leg',
    collisionFilter: { group: Body.nextGroup(true) },
    chamfer: { radius: 10 * scale },
    render: { fillStyle: '#FFBC42' },
  }, options);

  const leftLowerLegOptions = Common.extend({}, leftLegOptions, {
    render: { fillStyle: '#E59B12' },
  });

  const rightLegOptions = Common.extend({
    label: 'right-leg',
    collisionFilter: { group: Body.nextGroup(true) },
    chamfer: { radius: 10 * scale },
    render: { fillStyle: '#FFBC42' },
  }, options);

  const rightLowerLegOptions = Common.extend({}, rightLegOptions, {
    render: { fillStyle: '#E59B12' },
  });

  const head = Bodies.rectangle(x, y - 60 * scale, 34 * scale, 40 * scale, headOptions);
  const chest = Bodies.rectangle(x, y, 55 * scale, 80 * scale, chestOptions);
  const rightUpperArm = Bodies.rectangle(x + 39 * scale, y - 15 * scale, 20 * scale, 40 * scale, rightArmOptions);
  const rightLowerArm = Bodies.rectangle(x + 39 * scale, y + 25 * scale, 20 * scale, 60 * scale, rightLowerArmOptions);
  const leftUpperArm = Bodies.rectangle(x - 39 * scale, y - 15 * scale, 20 * scale, 40 * scale, leftArmOptions);
  const leftLowerArm = Bodies.rectangle(x - 39 * scale, y + 25 * scale, 20 * scale, 60 * scale, leftLowerArmOptions);
  const leftUpperLeg = Bodies.rectangle(x - 20 * scale, y + 57 * scale, 20 * scale, 40 * scale, leftLegOptions);
  const leftLowerLeg = Bodies.rectangle(x - 20 * scale, y + 97 * scale, 20 * scale, 60 * scale, leftLowerLegOptions);
  const rightUpperLeg = Bodies.rectangle(x + 20 * scale, y + 57 * scale, 20 * scale, 40 * scale, rightLegOptions);
  const rightLowerLeg = Bodies.rectangle(x + 20 * scale, y + 97 * scale, 20 * scale, 60 * scale, rightLowerLegOptions);

  const chestToRightUpperArm = Constraint.create({
    bodyA: chest,
    pointA: { x: 24 * scale, y: -23 * scale },
    pointB: { x: 0, y: -8 * scale },
    bodyB: rightUpperArm,
    stiffness: 0.6,
    render: { visible: false },
  });

  const chestToLeftUpperArm = Constraint.create({
    bodyA: chest,
    pointA: { x: -24 * scale, y: -23 * scale },
    pointB: { x: 0, y: -8 * scale },
    bodyB: leftUpperArm,
    stiffness: 0.6,
    render: { visible: false },
  });

  const chestToLeftUpperLeg = Constraint.create({
    bodyA: chest,
    pointA: { x: -10 * scale, y: 30 * scale },
    pointB: { x: 0, y: -10 * scale },
    bodyB: leftUpperLeg,
    stiffness: 0.6,
    render: { visible: false },
  });

  const chestToRightUpperLeg = Constraint.create({
    bodyA: chest,
    pointA: { x: 10 * scale, y: 30 * scale },
    pointB: { x: 0, y: -10 * scale },
    bodyB: rightUpperLeg,
    stiffness: 0.6,
    render: { visible: false },
  });

  const upperToLowerRightArm = Constraint.create({
    bodyA: rightUpperArm,
    bodyB: rightLowerArm,
    pointA: { x: 0, y: 15 * scale },
    pointB: { x: 0, y: -25 * scale },
    stiffness: 0.6,
    render: { visible: false },
  });

  const upperToLowerLeftArm = Constraint.create({
    bodyA: leftUpperArm,
    bodyB: leftLowerArm,
    pointA: { x: 0, y: 15 * scale },
    pointB: { x: 0, y: -25 * scale },
    stiffness: 0.6,
    render: { visible: false },
  });

  const upperToLowerLeftLeg = Constraint.create({
    bodyA: leftUpperLeg,
    bodyB: leftLowerLeg,
    pointA: { x: 0, y: 20 * scale },
    pointB: { x: 0, y: -20 * scale },
    stiffness: 0.6,
    render: { visible: false },
  });

  const upperToLowerRightLeg = Constraint.create({
    bodyA: rightUpperLeg,
    bodyB: rightLowerLeg,
    pointA: { x: 0, y: 20 * scale },
    pointB: { x: 0, y: -20 * scale },
    stiffness: 0.6,
    render: { visible: false },
  });

  const headConstraint = Constraint.create({
    bodyA: head,
    pointA: { x: 0, y: 25 * scale },
    pointB: { x: 0, y: -35 * scale },
    bodyB: chest,
    stiffness: 0.6,
    render: { visible: false },
  });

  const legToLeg = Constraint.create({
    bodyA: leftLowerLeg,
    bodyB: rightLowerLeg,
    stiffness: 0.01,
    render: { visible: false },
  });

  return Composite.create({
    bodies: [
      chest, head, leftLowerArm, leftUpperArm,
      rightLowerArm, rightUpperArm, leftLowerLeg,
      rightLowerLeg, leftUpperLeg, rightUpperLeg,
    ],
    constraints: [
      upperToLowerLeftArm, upperToLowerRightArm, chestToLeftUpperArm,
      chestToRightUpperArm, headConstraint, upperToLowerLeftLeg,
      upperToLowerRightLeg, chestToLeftUpperLeg, chestToRightUpperLeg,
      legToLeg,
    ],
  });
};
</script>