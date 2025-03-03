import { Return, Schema } from "@formity/react";
import { expry } from "./expry";

export type Values = [Return<unknown>];

export const schema = expry([
  {
    $schema$form: {
      values: {
        name: ["", []],
        surname: ["", []],
        age: [20, []],
      },
      render: {
        $jsx$screen: {
          progress: { total: 3, current: 1 },
          children: {
            $jsx$multiStep: {
              step: "name",
              onNext: "$$onNext",
              onBack: "$$onBack",
              getState: "$$getState",
              setState: "$$setState",
              children: {
                $jsx$step: {
                  defaultValues: "$$values",
                  resolver: {
                    $zod$resolver: {
                      $zod$object: {
                        name: {
                          $zod$string: [
                            {
                              type: "min",
                              args: 1,
                              text: "Required",
                            },
                            {
                              type: "max",
                              args: 20,
                              text: "Must be at most 20 characters",
                            },
                          ],
                        },
                        surname: {
                          $zod$string: [
                            {
                              type: "min",
                              args: 1,
                              text: "Required",
                            },
                            {
                              type: "max",
                              args: 20,
                              text: "Must be at most 20 characters",
                            },
                          ],
                        },
                        age: {
                          $zod$number: [
                            {
                              type: "min",
                              args: 18,
                              text: "Minimum of 18 years old",
                            },
                            {
                              type: "max",
                              args: 99,
                              text: "Maximum of 99 years old",
                            },
                          ],
                        },
                      },
                    },
                  },
                  children: {
                    $jsx$layout: {
                      heading: "Tell us about yourself",
                      description:
                        "We would want to know a little bit more about you",
                      fields: [
                        {
                          $jsx$row: {
                            key: "nameSurname",
                            items: [
                              {
                                $jsx$textField: {
                                  key: "name",
                                  name: "name",
                                  label: "Name",
                                },
                              },
                              {
                                $jsx$textField: {
                                  key: "surname",
                                  name: "surname",
                                  label: "Surname",
                                },
                              },
                            ],
                          },
                        },
                        {
                          $jsx$numberField: {
                            key: "age",
                            name: "age",
                            label: "Age",
                          },
                        },
                      ],
                      button: {
                        $jsx$nextButton: {
                          children: "Next",
                        },
                      },
                    },
                  },
                },
              },
            },
          },
        },
      },
    },
  },
  {
    $schema$form: {
      values: {
        softwareDeveloper: [true, []],
      },
      render: {
        $jsx$screen: {
          progress: { total: 3, current: 2 },
          children: {
            $jsx$multiStep: {
              step: "softwareDeveloper",
              onNext: "$$onNext",
              onBack: "$$onBack",
              getState: "$$getState",
              setState: "$$setState",
              children: {
                $jsx$step: {
                  defaultValues: "$$values",
                  resolver: {
                    $zod$resolver: {
                      $zod$object: {
                        softwareDeveloper: {
                          $zod$boolean: [],
                        },
                      },
                    },
                  },
                  children: {
                    $jsx$layout: {
                      heading: "Are you a software developer?",
                      description:
                        "We would like to know if you are a software developer",
                      fields: [
                        {
                          $jsx$yesNo: {
                            key: "softwareDeveloper",
                            name: "softwareDeveloper",
                            label: "Software Developer",
                          },
                        },
                      ],
                      button: {
                        $jsx$nextButton: {
                          children: "Next",
                        },
                      },
                      back: {
                        $jsx$backButton: {},
                      },
                    },
                  },
                },
              },
            },
          },
        },
      },
    },
  },
  {
    $schema$cond: {
      if: "$$softwareDeveloper",
      then: [
        {
          $schema$variables: {
            languagesOptions: [
              { value: "js", label: "JavaScript" },
              { value: "py", label: "Python" },
              { value: "go", label: "Go" },
            ],
            questions: {
              js: "What rating would you give to the JavaScript language?",
              py: "What rating would you give to the Python language?",
              go: "What rating would you give to the Go language?",
            },
          },
        },
        {
          $schema$form: {
            values: {
              languages: [[], []],
            },
            render: {
              $jsx$screen: {
                progress: { total: 3, current: 3 },
                children: {
                  $jsx$multiStep: {
                    step: "languages",
                    onNext: "$$onNext",
                    onBack: "$$onBack",
                    getState: "$$getState",
                    setState: "$$setState",
                    children: {
                      $jsx$step: {
                        defaultValues: "$$values",
                        resolver: {
                          $zod$resolver: {
                            $zod$object: {
                              languages: {
                                $zod$array: {
                                  $zod$string: [],
                                },
                              },
                            },
                          },
                        },
                        children: {
                          $jsx$layout: {
                            heading:
                              "What are your favourite programming languages?",
                            description:
                              "We would like to know which of the following programming languages you like the most",
                            fields: [
                              {
                                $jsx$multiSelect: {
                                  key: "languages",
                                  name: "languages",
                                  label: "Languages",
                                  options: "$$inputs.languagesOptions",
                                  direction: "y",
                                },
                              },
                            ],
                            button: {
                              $jsx$nextButton: {
                                children: "Next",
                              },
                            },
                            back: {
                              $jsx$backButton: {},
                            },
                          },
                        },
                      },
                    },
                  },
                },
              },
            },
          },
        },
        {
          $schema$variables: {
            i: 0,
            languagesRatings: [],
          },
        },
        {
          $schema$loop: {
            while: { $lt: ["$$i", { $length: "$$languages" }] },
            do: [
              {
                $schema$variables: {
                  language: { $arrayElemAt: ["$$languages", "$$i"] },
                },
              },
              {
                $schema$variables: {
                  question: {
                    $getValue: { input: "$$questions", key: "$$language" },
                  },
                },
              },
              {
                $schema$form: {
                  values: {
                    rating: ["love-it", ["$$language"]],
                  },
                  render: {
                    $jsx$screen: {
                      progress: {
                        total: { $add: [3, "$$inputs.languages.length"] },
                        current: { $add: [4, "$$inputs.i"] },
                      },
                      children: {
                        $jsx$multiStep: {
                          step: {
                            $concat: ["rating", "-", "$$inputs.language"],
                          },
                          onNext: "$$onNext",
                          onBack: "$$onBack",
                          getState: "$$getState",
                          setState: "$$setState",
                          children: {
                            $jsx$step: {
                              defaultValues: "$$values",
                              resolver: {
                                $zod$resolver: {
                                  $zod$object: {
                                    rating: {
                                      $zod$string: [],
                                    },
                                  },
                                },
                              },
                              children: {
                                $jsx$layout: {
                                  heading: "$$inputs.question",
                                  description:
                                    "Since you said it is one of your favourite languages, we would like to know how much you like it",
                                  fields: [
                                    {
                                      $jsx$select: {
                                        key: "rating",
                                        name: "rating",
                                        label: "Rating",
                                        options: [
                                          {
                                            value: "love-it",
                                            label: "Love it",
                                          },
                                          {
                                            value: "like-it-a-lot",
                                            label: "Like it a lot",
                                          },
                                          {
                                            value: "it-is-okay",
                                            label: "It's okay",
                                          },
                                        ],
                                        direction: "y",
                                      },
                                    },
                                  ],
                                  button: {
                                    $jsx$nextButton: {
                                      children: "Next",
                                    },
                                  },
                                  back: {
                                    $jsx$backButton: {},
                                  },
                                },
                              },
                            },
                          },
                        },
                      },
                    },
                  },
                },
              },
              {
                $schema$variables: {
                  i: { $add: ["$$i", 1] },
                  languagesRatings: {
                    $concatArrays: [
                      "$$languagesRatings",
                      [{ name: "$$language", rating: "$$rating" }],
                    ],
                  },
                },
              },
            ],
          },
        },
        {
          $schema$return: {
            fullName: { $concat: ["$$name", " ", "$$surname"] },
            age: "$$age",
            softwareDeveloper: true,
            languages: "$$languagesRatings",
          },
        },
      ],
      else: [
        {
          $schema$form: {
            values: {
              interested: ["maybe", []],
            },
            render: {
              $jsx$screen: {
                progress: { total: 3, current: 3 },
                children: {
                  $jsx$multiStep: {
                    step: "interested",
                    onNext: "$$onNext",
                    onBack: "$$onBack",
                    getState: "$$getState",
                    setState: "$$setState",
                    children: {
                      $jsx$step: {
                        defaultValues: "$$values",
                        resolver: {
                          $zod$resolver: {
                            $zod$object: {
                              interested: {
                                $zod$string: [],
                              },
                            },
                          },
                        },
                        children: {
                          $jsx$layout: {
                            heading:
                              "Would you be interested in learning how to code?",
                            description:
                              "Having coding skills can be very beneficial",
                            fields: [
                              {
                                $jsx$listbox: {
                                  key: "interested",
                                  name: "interested",
                                  label: "Interested",
                                  options: [
                                    {
                                      value: "maybe",
                                      label: "Maybe in another time.",
                                    },
                                    {
                                      value: "yes",
                                      label: "Yes, that sounds good.",
                                    },
                                    {
                                      value: "no",
                                      label: "No, it is not for me.",
                                    },
                                  ],
                                },
                              },
                            ],
                            button: {
                              $jsx$nextButton: {
                                children: "Next",
                              },
                            },
                            back: {
                              $jsx$backButton: {},
                            },
                          },
                        },
                      },
                    },
                  },
                },
              },
            },
          },
        },
        {
          $schema$return: {
            fullName: { $concat: ["$$name", " ", "$$surname"] },
            age: "$$age",
            softwareDeveloper: false,
            interested: "$$interested",
          },
        },
      ],
    },
  },
]) as Schema<Values>;
