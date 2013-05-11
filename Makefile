.SUFFIXES: .js
VPATH = src
BUILD_DIR=build
COFFEES = $(BUILD_DIR)/header.js $(BUILD_DIR)/main.js $(BUILD_DIR)/soldier.js $(BUILD_DIR)/soldier_box.js $(BUILD_DIR)/view.js $(BUILD_DIR)/blacksmith_box.js $(BUILD_DIR)/soldier_util.js $(BUILD_DIR)/village.js $(BUILD_DIR)/village_util.js $(BUILD_DIR)/status.js $(BUILD_DIR)/main_view.js $(BUILD_DIR)/config.js $(BUILD_DIR)/sally.js
OBJS = $(COFFEES) src/table.js  src/jquery-cookie.js  src/legacy.js
TARGET = bro3_auto_builder.user.js

auto: $(TARGET)

$(BUILD_DIR)/%.js: %.coffee
	coffee -b -o $(BUILD_DIR) -c $<

$(TARGET): $(OBJS)
	cat $(OBJS) | ./bin/timestamp.sh > $(TARGET)

clean:
	rm -r $(BUILD_DIR)

build_for_travis:
	coffee -b -o build -c src
	coffee -b -o spec/javascripts/js -c spec/javascripts/coffee
