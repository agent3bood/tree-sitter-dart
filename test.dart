library keyword.test;

import 'foo.dart' as test show A hide B;

export 'other.dart';

part 'other2.dart';

enum Bar { a, b }

typedef Test = Function();

abstract class Foo extends Other3 implements Other2 {
  int _bar = 1;
  int get bar => _bar;
  set bar(int value) => _bar = value;

  operator [](int index) => null;
}

class Other extends Foo {
  static int a = 1;
  final int b = 2;

  void foo(covariant String test) {}
  factory Other.something() => Other();

  Other() : super() {
    this.b;
  }
}

class Other2 {}

class Other3 with Other4 {}

mixin Other4 {}

void main() {
  assert(1 == 1);
  const foo = 1;
  final bar = 2;
  var car = null;

  new Other();

  for (var i = 0; i < 10; i++) {
    continue;
  }

  for (var i in [1, 2, 3]) {}

  switch (true) {
    case true:
      break;
    default:
      break;
  }

  if (1 is int) {
  } else {}

  do {
    print('asdf');
  } while (1 == 2);

  try {
    throw Exception();
  } on Exception {
  } catch (e) {
    rethrow;
  } finally {}
}

void foo() async {
  await other('');
}

Future<void> other(dynamic test) async {
  return;
}

extension Something on int {}

Iterable<int> bar() sync* {
  yield 1;
}

Stream<int> bar2() async* {
  yield 1;
}
