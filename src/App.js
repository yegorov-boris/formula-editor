import React, {Component} from 'react';
import './App.css';
import MathJax from './MathJax'
import { saveAs } from 'file-saver'
import Select from "react-select";
import htmlToImage from 'html-to-image';

class App extends Component {
    constructor(props) {
        super(props);
        const options = [
            { value: "\\sqrt", label: "квадратный корень" },
            { value: "\\over", label: "дробь" },
            { value: "\\pm", label: "\u00B1" }
        ];
        this.state = {
            math: '',
            selectionStart: 0,
            selectionEnd: 0,
            select: {
                value: null,
                options
            }
        };
        this.handleChange = this.handleChange.bind(this);
        this.load = this.load.bind(this);
        this.saveJpeg = this.saveJpeg.bind(this);
        this.saveTxt = this.saveTxt.bind(this);
        this.addFormulaElement = this.addFormulaElement.bind(this);
        this.setSelection = this.setSelection.bind(this);
    }

    handleChange({target}) {
        const v = target.value;
        this.setState(() => ({math: v}))
    }

    saveJpeg() {
        const el = document.getElementById('react-mathjax-preview');
        htmlToImage.toBlob(el)
            .then(function (blob) {
                saveAs(blob, Date.now() + ".jpg");
            });
    }

    saveTxt() {
        const blob = new Blob([this.state.math], {type: "text/plain;charset=utf-8"});
        saveAs(blob, Date.now() + ".txt");
    }

    load({target}) {
        const reader = new FileReader();
        reader.onload = ({target}) => this.setState(() => ({math: target.result}));
        reader.readAsText(target.files[0]);
    }

    addFormulaElement({value}) {
        this.setState(({math, selectionStart, selectionEnd}) => {
            const start = selectionStart + value.length;
            return {
                math: `${math.substr(0, selectionStart)} ${value} ${math.substr(selectionEnd)}`,
                selectionStart: start,
                selectionEnd: start,
            }
        });
        this.setValue(null);
    }

    setSelection({target}) {
        this.setState(() => ({
            selectionStart: target.selectionStart,
            selectionEnd: target.selectionEnd,
        }))
    }

    setValue(value) {
        this.setState(prevState => ({
            select: {
                ...prevState.select,
                value
            }
        }));
    };

    render() {
        const { select } = this.state;

        return (
            <div className="App">
                <div className="Text">
                    <textarea
                        id="MathInput"
                        onChange={this.handleChange}
                        onPointerUp={this.setSelection}
                        onKeyUp={this.setSelection}
                        value={this.state.math}
                    />
                </div>
                <div className="Tooltips">
                    <Select
                        placeholder="добавить элемент"
                        value={select.value}
                        onChange={this.addFormulaElement}
                        options={select.options}
                    />
                </div>
                <div className="Menu">
                    <div className="MenuItem">
                        <input type="file" onChange={this.load}/>
                    </div>
                    <div className="MenuItem">
                        <button id="SaveJpeg" onClick={this.saveJpeg}>сохранить как jpeg</button>
                        <button onClick={this.saveTxt}>сохранить как txt</button>
                    </div>
                </div>
                <div>
                    <MathJax math={this.state.math} />
                </div>
            </div>
        );
    }
}

export default App;
