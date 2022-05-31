const placeholder = `
  # this is a header!
  
  ## this is a sub-header!
  
  [this](google.com) is a link
  
  \` here is some code \` between 2 backticks
  
  \`\`\`
    multi-line code baby
    you heard me
    you're saying this isn't code? you're code. yeah i said it.
  \`\`\`
  
  > Block Quote Block Quote Bonk Quote
  
  **B O L D**
  
  - This
    - is
      - a
        - list
        
  ![Sexy Platypus](https://cdn.mos.cms.futurecdn.net/LTgdH3aE3sitD5Hwvf7Nym-1024-80.jpg.webp)
  

`;

const Toolbar = props => {
  return /*#__PURE__*/(
    React.createElement("div", { className: "toolbar" }, /*#__PURE__*/
    React.createElement("i", { className: "fa fa-free-code-camp" }),
    props.text, /*#__PURE__*/
    React.createElement("i", { className: props.icon, onClick: props.onClick })));


};

const Editor = props => {
  return /*#__PURE__*/(
    React.createElement("textarea", {
      id: "editor",
      onChange: props.onChange,
      type: "text",
      value: props.markdown }));




};


const renderer = new marked.Renderer();
renderer.link = function (href, title, text) {
  return `<a target="_blank" href=""${href}">${text}</a>`;
};

const Preview = props => {
  return (
    React.createElement("div", {
      dangerouslySetInnerHTML: {
        __html: marked(props.markdown, { renderer: renderer }) },

      id: "preview" }));


};

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      markdown: placeholder,
      editorMaximized: false,
      previewMaximized: false };


    this.handleChange = this.handleChange.bind(this);
    this.handleEditorMaximize = this.handleEditorMaximize.bind(this);
    this.handlePreviewMaximize = this.handlePreviewMaximize.bind(this);
  }

  handleChange(e) {
    this.setState({
      markdown: e.target.value });

  }

  handleEditorMaximize() {
    this.setState({
      editorMaximized: !this.state.editorMaximized });

  }

  handlePreviewMaximize() {
    this.setState({
      previewMaximized: !this.state.previewMaximized });

  }

  render() {
    const classes = this.state.editorMaximized ?
    ['editorWrap maximized', 'previewWrap hide', 'fa fa-compress'] :
    this.state.previewMaximized ?
    ['editorWrap hide', 'previewWrap maximized', 'fa fa-compress'] :
    ['editorWrap', 'previewWrap', 'fa fa-arrows-alt'];

    return /*#__PURE__*/(
      React.createElement("div", null, /*#__PURE__*/
      React.createElement("div", { className: classes[0] }, /*#__PURE__*/
      React.createElement(Toolbar, {
        icon: classes[2],
        onClick: this.handleEditorMaximize,
        text: "Editor" }), /*#__PURE__*/

      React.createElement(Editor, {
        markdown: this.state.markdown,
        onChange: this.handleChange })), /*#__PURE__*/


      React.createElement("div", { className: "converter" }), /*#__PURE__*/
      React.createElement("div", { className: classes[1] }, /*#__PURE__*/
      React.createElement(Toolbar, {
        icon: classes[2],
        onClick: this.handlePreviewMaximize,
        text: "Previewer" }), /*#__PURE__*/

      React.createElement(Preview, { markdown: this.state.markdown }))));



  }}


ReactDOM.render( /*#__PURE__*/React.createElement(App, null), document.getElementById("app"));