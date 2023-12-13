StartupEvents.registry("fluid", (event) => {
  event
    .create("fermented_goop")
    .displayName("Fermented Goop")
    .thickTexture(0xe0c3bc)
    .bucketColor(0xe0c3bc)
    .noBlock();
  event
    .create("organic_mass")
    .displayName("Organic Mass")
    .thickTexture(0x2db83d)
    .bucketColor(0x2db83d)
  event
    .create("minecraft:milk").displayName("Milk")
    .thinTexture(0xfcfcfc)
    .bucketColor(0xfcfcfc)
});

StartupEvents.registry("item", (event) => {
  event
    .create("fermented_blob")
    .displayName("Fermented Blob")
    .food((food) => {
      food
        .hunger(3)
        .saturation(3) //This value does not directly translate to saturation points gained
        .fastToEat() //Like dried kelp
        .meat(); //Dogs are willing to eat it
    });

    event.create("ptdye:incomplete_sturdy_device", 'create:sequenced_assembly');
    event.create("ptdye:incomplete_mechanical_device", 'create:sequenced_assembly');
    event.create("ptdye:incomplete_sealed_device", 'create:sequenced_assembly');
    event.create("ptdye:incomplete_smart_device", 'create:sequenced_assembly');
    event.create("ptdye:incomplete_locomotive_device", 'create:sequenced_assembly');
    event.create("ptdye:incomplete_logic_device", 'create:sequenced_assembly');
});

StartupEvents.registry("block", (event) => {
  const device = name => {
    return event
      .create(name,"cardinal")
      .hardness(2)
      .resistance(6)
      .tagBlock("create:wrench_pickup")
      .opaque(false)
      .notSolid()
      .redstoneConductor(false)
      .fullBlock(false)
      .noValidSpawns(true)
      .suffocating(false)
      .viewBlocking(false)
      .transparent(true);
  }

  device("ptdye:sturdy_device")
    .material("stone")
    .soundType("stone");

  device("ptdye:logic_device")
    .material("stone")
    .soundType("stone")
    .box(0, 0, 0, 16, 2, 16);
    
  device("ptdye:sealed_device")
    .material("metal")
    .soundType("copper")
    .box(0, 0, 0, 16, 15, 16);

  device("ptdye:smart_device")
    .material("metal")
    .soundType("metal");
    

  device("ptdye:mechanical_device")
    .material("metal")
    .soundType("wood");

  device("ptdye:locomotive_device")
    .material("metal")
    .soundType("metal")
    .box(3, 0, 0, 13, 9, 16)
    .box(4, 9, 4, 12, 12, 16);
});
