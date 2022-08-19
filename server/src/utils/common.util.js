/**
*
* @author: lntung
* @return: {
  true: at least an element is empty;
  false: whole data is filled
}
* CreatedDate: 13/06/2022
*/
exports.checkEmptyField = (data) => {
  for (let index = 0; index < data.length; index++) {
    const element = data[index];
    if (element == undefined || element == null) return true;
    if (index == data.length - 1 && element != undefined && element != null) return false;
  }

}