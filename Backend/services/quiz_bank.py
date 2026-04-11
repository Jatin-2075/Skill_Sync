"""
Static skill question bank for the skill-verification system.
Each skill has a list of MCQ questions.
Pass threshold = 70%.
"""

from typing import TypedDict


class Option(TypedDict):
    id: str
    text: str


class Question(TypedDict):
    id: str
    question: str
    options: list[Option]
    correct: str   # option id
    explanation: str


# Map: lowercase skill name → list of questions
QUESTION_BANK: dict[str, list[Question]] = {
    "python": [
        {
            "id": "py1",
            "question": "What is the output of `print(type([]) is list)`?",
            "options": [
                {"id": "a", "text": "True"},
                {"id": "b", "text": "False"},
                {"id": "c", "text": "TypeError"},
                {"id": "d", "text": "None"},
            ],
            "correct": "a",
            "explanation": "`type([])` returns `list`, so `is list` is True.",
        },
        {
            "id": "py2",
            "question": "Which keyword is used to define a generator function in Python?",
            "options": [
                {"id": "a", "text": "async"},
                {"id": "b", "text": "yield"},
                {"id": "c", "text": "return"},
                {"id": "d", "text": "lambda"},
            ],
            "correct": "b",
            "explanation": "A function with `yield` becomes a generator.",
        },
        {
            "id": "py3",
            "question": "What does `*args` capture in a function definition?",
            "options": [
                {"id": "a", "text": "Keyword arguments as a dict"},
                {"id": "b", "text": "Positional arguments as a tuple"},
                {"id": "c", "text": "Positional arguments as a list"},
                {"id": "d", "text": "All arguments flattened"},
            ],
            "correct": "b",
            "explanation": "`*args` collects extra positional args into a **tuple**.",
        },
        {
            "id": "py4",
            "question": "Which data structure in Python is ordered and mutable?",
            "options": [
                {"id": "a", "text": "tuple"},
                {"id": "b", "text": "frozenset"},
                {"id": "c", "text": "list"},
                {"id": "d", "text": "dict_keys"},
            ],
            "correct": "c",
            "explanation": "Lists are ordered and mutable. Tuples are ordered but immutable.",
        },
        {
            "id": "py5",
            "question": "What is the time complexity of `x in set_obj` for a Python set?",
            "options": [
                {"id": "a", "text": "O(n)"},
                {"id": "b", "text": "O(log n)"},
                {"id": "c", "text": "O(1) average"},
                {"id": "d", "text": "O(n^2)"},
            ],
            "correct": "c",
            "explanation": "Sets use a hash table — membership test is O(1) average.",
        },
    ],
    "javascript": [
        {
            "id": "js1",
            "question": "What will `typeof null` return?",
            "options": [
                {"id": "a", "text": '"null"'},
                {"id": "b", "text": '"undefined"'},
                {"id": "c", "text": '"object"'},
                {"id": "d", "text": '"NaN"'},
            ],
            "correct": "c",
            "explanation": "A historical bug in JS — `typeof null === 'object'`.",
        },
        {
            "id": "js2",
            "question": "Which method is used to create a shallow copy of an array?",
            "options": [
                {"id": "a", "text": "arr.copy()"},
                {"id": "b", "text": "arr.clone()"},
                {"id": "c", "text": "[...arr]"},
                {"id": "d", "text": "arr.duplicate()"},
            ],
            "correct": "c",
            "explanation": "Spread syntax `[...arr]` creates a shallow copy.",
        },
        {
            "id": "js3",
            "question": "What does `===` check compared to `==`?",
            "options": [
                {"id": "a", "text": "Value only"},
                {"id": "b", "text": "Type only"},
                {"id": "c", "text": "Value and type (no coercion)"},
                {"id": "d", "text": "Reference equality"},
            ],
            "correct": "c",
            "explanation": "`===` is strict equality — no type coercion.",
        },
        {
            "id": "js4",
            "question": "What is a closure in JavaScript?",
            "options": [
                {"id": "a", "text": "A way to close the browser tab"},
                {"id": "b", "text": "A function that remembers its lexical scope even when executed outside it"},
                {"id": "c", "text": "An IIFE pattern"},
                {"id": "d", "text": "A method to terminate async operations"},
            ],
            "correct": "b",
            "explanation": "Closures allow inner functions to access outer scope variables.",
        },
        {
            "id": "js5",
            "question": "What does `Promise.all([p1,p2,p3])` do when p2 rejects?",
            "options": [
                {"id": "a", "text": "Waits for p1 and p3 to settle"},
                {"id": "b", "text": "Immediately rejects the whole promise"},
                {"id": "c", "text": "Returns partial results"},
                {"id": "d", "text": "Retries p2 automatically"},
            ],
            "correct": "b",
            "explanation": "`Promise.all` short-circuits on the first rejection.",
        },
    ],
    "react": [
        {
            "id": "re1",
            "question": "Which hook is used to perform side effects in a functional component?",
            "options": [
                {"id": "a", "text": "useState"},
                {"id": "b", "text": "useEffect"},
                {"id": "c", "text": "useContext"},
                {"id": "d", "text": "useRef"},
            ],
            "correct": "b",
            "explanation": "`useEffect` runs after render and handles side effects.",
        },
        {
            "id": "re2",
            "question": "What does the dependency array `[]` in `useEffect` mean?",
            "options": [
                {"id": "a", "text": "Runs on every render"},
                {"id": "b", "text": "Runs only on unmount"},
                {"id": "c", "text": "Runs only once after the initial render"},
                {"id": "d", "text": "Disabled"},
            ],
            "correct": "c",
            "explanation": "An empty deps array makes it run once — like componentDidMount.",
        },
        {
            "id": "re3",
            "question": "How do you prevent unnecessary re-renders of a child component?",
            "options": [
                {"id": "a", "text": "React.lazy"},
                {"id": "b", "text": "React.memo"},
                {"id": "c", "text": "React.forwardRef"},
                {"id": "d", "text": "React.createContext"},
            ],
            "correct": "b",
            "explanation": "`React.memo` memoizes the component and skips re-render if props are the same.",
        },
        {
            "id": "re4",
            "question": "What is the correct way to update an object in state?",
            "options": [
                {"id": "a", "text": "state.name = 'new'; setState(state)"},
                {"id": "b", "text": "setState({ ...state, name: 'new' })"},
                {"id": "c", "text": "setState(Object.assign(state, {name:'new'}))"},
                {"id": "d", "text": "mutate(state.name, 'new')"},
            ],
            "correct": "b",
            "explanation": "Always return a new object; never mutate state directly.",
        },
        {
            "id": "re5",
            "question": "What is the purpose of the `key` prop in a list?",
            "options": [
                {"id": "a", "text": "Styling each list item"},
                {"id": "b", "text": "Encrypting props"},
                {"id": "c", "text": "Helping React identify which items changed for efficient re-rendering"},
                {"id": "d", "text": "Mapping event handlers"},
            ],
            "correct": "c",
            "explanation": "Keys give React a stable identity for each list element.",
        },
    ],
    "typescript": [
        {
            "id": "ts1",
            "question": "What does the `readonly` modifier do on an interface property?",
            "options": [
                {"id": "a", "text": "Makes the property optional"},
                {"id": "b", "text": "Prevents reassignment after initialisation"},
                {"id": "c", "text": "Marks it as deprecated"},
                {"id": "d", "text": "Converts it to a getter"},
            ],
            "correct": "b",
            "explanation": "`readonly` prevents a property from being changed after it is set.",
        },
        {
            "id": "ts2",
            "question": "What is the difference between `type` and `interface` in TypeScript?",
            "options": [
                {"id": "a", "text": "There is no difference"},
                {"id": "b", "text": "`interface` can be extended and merged; `type` supports unions and intersections"},
                {"id": "c", "text": "`type` is for functions only"},
                {"id": "d", "text": "`interface` cannot be used with generics"},
            ],
            "correct": "b",
            "explanation": "Interfaces are open (mergeable); types can alias unions, tuples, etc.",
        },
        {
            "id": "ts3",
            "question": "What does `keyof T` produce?",
            "options": [
                {"id": "a", "text": "A union of all values in T"},
                {"id": "b", "text": "A union of all property keys in T"},
                {"id": "c", "text": "The type of T's constructor"},
                {"id": "d", "text": "An array of T's keys"},
            ],
            "correct": "b",
            "explanation": "`keyof T` creates a union of the string/number literal types of T's keys.",
        },
        {
            "id": "ts4",
            "question": "What is the `never` type used for?",
            "options": [
                {"id": "a", "text": "Nullable values"},
                {"id": "b", "text": "Functions that always throw or never return"},
                {"id": "c", "text": "Async functions"},
                {"id": "d", "text": "Empty arrays"},
            ],
            "correct": "b",
            "explanation": "`never` is the type of values that never occur — e.g., a function that always throws.",
        },
        {
            "id": "ts5",
            "question": "What does `Partial<T>` do?",
            "options": [
                {"id": "a", "text": "Makes all properties required"},
                {"id": "b", "text": "Removes all properties"},
                {"id": "c", "text": "Makes all properties optional"},
                {"id": "d", "text": "Picks a subset of properties"},
            ],
            "correct": "c",
            "explanation": "`Partial<T>` maps every property of T to be optional.",
        },
    ],
    "fastapi": [
        {
            "id": "fa1",
            "question": "Which decorator creates a GET endpoint in FastAPI?",
            "options": [
                {"id": "a", "text": "@app.get_route"},
                {"id": "b", "text": "@app.get"},
                {"id": "c", "text": "@get_endpoint"},
                {"id": "d", "text": "@route.get"},
            ],
            "correct": "b",
            "explanation": "`@app.get('/path')` registers a GET route in FastAPI.",
        },
        {
            "id": "fa2",
            "question": "What does `Depends()` do in a route signature?",
            "options": [
                {"id": "a", "text": "Marks an optional parameter"},
                {"id": "b", "text": "Declares a dependency that FastAPI resolves automatically"},
                {"id": "c", "text": "Enables async execution"},
                {"id": "d", "text": "Validates query strings"},
            ],
            "correct": "b",
            "explanation": "`Depends` tells FastAPI to call the provided callable and inject the result.",
        },
        {
            "id": "fa3",
            "question": "What is the default HTTP status code for a successful POST in FastAPI?",
            "options": [
                {"id": "a", "text": "200"},
                {"id": "b", "text": "201"},
                {"id": "c", "text": "204"},
                {"id": "d", "text": "202"},
            ],
            "correct": "a",
            "explanation": "FastAPI returns 200 by default; specify `status_code=201` for created.",
        },
        {
            "id": "fa4",
            "question": "How do you declare a required path parameter in FastAPI?",
            "options": [
                {"id": "a", "text": "@app.get('/{item_id}') with `item_id` in the function signature"},
                {"id": "b", "text": "Using Query(...)"},
                {"id": "c", "text": "Using Header(...)"},
                {"id": "d", "text": "Hardcoding the path"},
            ],
            "correct": "a",
            "explanation": "Path params are declared in curly braces in the path and matched by name in the signature.",
        },
        {
            "id": "fa5",
            "question": "What class should response models inherit from?",
            "options": [
                {"id": "a", "text": "dataclass"},
                {"id": "b", "text": "pydantic.BaseModel"},
                {"id": "c", "text": "typing.TypedDict"},
                {"id": "d", "text": "sqlalchemy.Base"},
            ],
            "correct": "b",
            "explanation": "FastAPI uses Pydantic models for serialisation and validation.",
        },
    ],
    "sql": [
        {
            "id": "sql1",
            "question": "Which SQL clause filters results after grouping?",
            "options": [
                {"id": "a", "text": "WHERE"},
                {"id": "b", "text": "FILTER"},
                {"id": "c", "text": "HAVING"},
                {"id": "d", "text": "LIMIT"},
            ],
            "correct": "c",
            "explanation": "`HAVING` filters groups after `GROUP BY`, while `WHERE` filters rows before grouping.",
        },
        {
            "id": "sql2",
            "question": "What does `INNER JOIN` return?",
            "options": [
                {"id": "a", "text": "All rows from both tables"},
                {"id": "b", "text": "Only rows with matching values in both tables"},
                {"id": "c", "text": "All rows from the left table"},
                {"id": "d", "text": "Null-padded rows from the right table"},
            ],
            "correct": "b",
            "explanation": "`INNER JOIN` returns only the intersection — rows that match in both tables.",
        },
        {
            "id": "sql3",
            "question": "What does `DISTINCT` do in a SELECT statement?",
            "options": [
                {"id": "a", "text": "Sorts the results"},
                {"id": "b", "text": "Removes duplicate rows"},
                {"id": "c", "text": "Limits the result to 1 row"},
                {"id": "d", "text": "Filters NULLs"},
            ],
            "correct": "b",
            "explanation": "`SELECT DISTINCT` eliminates duplicate result rows.",
        },
        {
            "id": "sql4",
            "question": "Which keyword is used to retrieve unique values?",
            "options": [
                {"id": "a", "text": "UNIQUE"},
                {"id": "b", "text": "ONLY"},
                {"id": "c", "text": "DISTINCT"},
                {"id": "d", "text": "ONE"},
            ],
            "correct": "c",
            "explanation": "`DISTINCT` is the keyword for unique values in SQL SELECTs.",
        },
        {
            "id": "sql5",
            "question": "What does a `PRIMARY KEY` constraint enforce?",
            "options": [
                {"id": "a", "text": "The column must be text"},
                {"id": "b", "text": "The column must be unique and not null"},
                {"id": "c", "text": "The column references another table"},
                {"id": "d", "text": "The column auto-increments"},
            ],
            "correct": "b",
            "explanation": "A primary key must be unique and NOT NULL — it identifies each row.",
        },
    ],
    "docker": [
        {
            "id": "dk1",
            "question": "What is the purpose of a Dockerfile?",
            "options": [
                {"id": "a", "text": "To run containers"},
                {"id": "b", "text": "To define the instructions for building a Docker image"},
                {"id": "c", "text": "To configure Docker networking"},
                {"id": "d", "text": "To manage volumes"},
            ],
            "correct": "b",
            "explanation": "A Dockerfile is a build script — each instruction adds a layer to the image.",
        },
        {
            "id": "dk2",
            "question": "Which command starts a stopped container?",
            "options": [
                {"id": "a", "text": "docker run"},
                {"id": "b", "text": "docker start"},
                {"id": "c", "text": "docker exec"},
                {"id": "d", "text": "docker restart"},
            ],
            "correct": "b",
            "explanation": "`docker start` resumes a stopped container; `docker run` creates a new one.",
        },
        {
            "id": "dk3",
            "question": "What does `EXPOSE` in a Dockerfile do?",
            "options": [
                {"id": "a", "text": "Publishes the port to the host automatically"},
                {"id": "b", "text": "Documents that the container listens on that port (does not publish)"},
                {"id": "c", "text": "Opens a firewall rule"},
                {"id": "d", "text": "Binds to 0.0.0.0"},
            ],
            "correct": "b",
            "explanation": "`EXPOSE` is documentation only; you still need `-p` to publish to the host.",
        },
        {
            "id": "dk4",
            "question": "What is the difference between `CMD` and `ENTRYPOINT`?",
            "options": [
                {"id": "a", "text": "There is no difference"},
                {"id": "b", "text": "`ENTRYPOINT` is the fixed command; `CMD` provides default arguments that can be overridden"},
                {"id": "c", "text": "`CMD` always runs; `ENTRYPOINT` is optional"},
                {"id": "d", "text": "`ENTRYPOINT` sets env vars"},
            ],
            "correct": "b",
            "explanation": "`ENTRYPOINT` defines the binary; `CMD` gives overridable default arguments.",
        },
        {
            "id": "dk5",
            "question": "What does `docker-compose up -d` do?",
            "options": [
                {"id": "a", "text": "Builds all images only"},
                {"id": "b", "text": "Starts all services defined in docker-compose.yml in detached mode"},
                {"id": "c", "text": "Removes all services"},
                {"id": "d", "text": "Shows service logs"},
            ],
            "correct": "b",
            "explanation": "`-d` flag runs containers in the background (detached).",
        },
    ],
}


SUPPORTED_SKILLS = sorted(QUESTION_BANK.keys())


def get_questions(skill: str) -> list[Question]:
    """Return questions for a skill (case-insensitive). Returns [] if not found."""
    return QUESTION_BANK.get(skill.lower(), [])


def calculate_score(skill: str, answers: dict[str, str]) -> tuple[float, int, int]:
    """
    Grade a set of answers.
    Returns (score_percentage, correct_count, total_questions).
    answers = {"question_id": "chosen_option_id"}
    """
    questions = get_questions(skill)
    if not questions:
        return 0.0, 0, 0

    correct = sum(
        1 for q in questions if answers.get(q["id"]) == q["correct"]
    )
    total = len(questions)
    score = (correct / total) * 100
    return round(score, 2), correct, total
