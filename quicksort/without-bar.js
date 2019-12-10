// configuration is located in this method
startIt();

// draw all steps at once
snapshots.forEach((element, i) => draw(element, i + 1));
