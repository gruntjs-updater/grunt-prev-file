## Getting Started
This plugin requires Grunt `~0.4.0`

If you haven't used [Grunt](http://gruntjs.com/) before, be sure to check out the [Getting Started](http://gruntjs.com/getting-started) guide, as it explains how to create a [Gruntfile](http://gruntjs.com/sample-gruntfile) as well as install and use Grunt plugins. Once you're familiar with that process, you may install this plugin with this command:

```shell
npm install grunt-prev-file --save-dev
```

Once the plugin has been installed, it may be enabled inside your Gruntfile with this line of JavaScript:

```js
grunt.loadNpmTasks('grunt-prev-file');
```

## Where this plugin can help me?

Sometimes you need to organize tasks into 'chains' that differs a bit. Here may pop up an issue with filenames. See next diagram

```
chain #1: task A ->   ->    -> task B
chain #2: task A -> task AB -> task B
```

You can omit this via adding new target for B task. But in case when you have lots of tasks and more than 2 chains amount of additional targets may increase too fast.

This plugin allows you do not create additional targets and get actual previous filename(s) with help its 'API'. See next example


## Example of usage

```js
grunt.initConfig({
  prev_file: {
    target1: {
      // Next param is required. It has to be a function that
      // defines how filepath will be created.
      createFilename: function(currentTask) {
        return 'build/' + 'mySuperScript-' + currentTask.name + '.js'
      },
    }
  },
  copy: {
    target1: {
      src: ['file1.js', 'file2.js']
      // here we pass a link to grunt task that currently executed
      dest: '<%= prev_file.target1.getNewDestFile(grunt.task.current) %>'
    }
  },
  strip_code: {
    target1: {
      src: '<%= prev_file.target1.getLastDestFile() %>'
      dest: '<%= prev_file.target1.getNewDestFile(grunt.task.current) %>'
    }
  },
  replace: {
    target1: {
      pattern: {from 'aaa', to: 'bbb'},
      src: '<%= prev_file.target1.getLastDestFile() %>'
      dest: '<%= prev_file.target1.getNewDestFile(grunt.task.current) %>'
    }
  },
  iconv: {
    target1: {
      pattern: {from 'utf-8', to: 'utf-16'},
      src: '<%= prev_file.target1.getLastDestFile() %>'
      dest: '<%= prev_file.target1.getNewDestFile(grunt.task.current) %>'
    }
  },
  uglify: {
    target1: {
      src: '<%= prev_file.target1.getLastDestFile() %>'
      dest: '<%= prev_file.target1.getNewDestFile(grunt.task.current) %>'
    }
  }
});

grunt.registerTask('makeDev', ['copy', 'replace', 'iconv']);
grunt.registerTask('makeRelease', ['copy', 'replace', 'strip_code', 'uglify', 'iconv']);
```

