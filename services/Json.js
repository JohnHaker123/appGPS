const extraerJson = async input => {
    const lastIndex = input.lastIndexOf(']') > input.lastIndexOf('}') ? input.lastIndexOf(']') + 1 : input.lastIndexOf('}') + 1;
    const jsonString = input.substring(0, lastIndex);
    try {
      const jsonData = JSON.parse(jsonString);
      return jsonData;
    } catch (e) {
      return {"success":"error"};
    }
}

export default { extraerJson }